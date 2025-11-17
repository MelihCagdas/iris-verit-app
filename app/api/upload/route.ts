import { NextRequest, NextResponse } from 'next/server';
import { saveFile, isValidResumeFile, getFileExtension } from '@/lib/fileStorage';
import { parseResumeFile } from '@/lib/resumeParser';
import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!isValidResumeFile(file.name)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload PDF or DOC/DOCX' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const ext = getFileExtension(file.name);
    const filename = `${randomUUID()}.${ext}`;
    const fileUrl = await saveFile(file, filename);

    // Parse the resume
    const parsed = await parseResumeFile(fileUrl, filename);

    // Create or update user profile
    // For now, we'll create a new profile. In production, you'd link to authenticated user
    const profile = await prisma.userProfile.create({
      data: {
        name: parsed.personalInfo?.name || '',
        email: parsed.personalInfo?.email || '',
        phone: parsed.personalInfo?.phone || '',
        location: parsed.personalInfo?.location || '',
        summary: parsed.sections.summary || '',
        originalFileUrl: fileUrl,
      },
    });

    // Create work experiences if parsed
    if (parsed.sections.experience && parsed.sections.experience.length > 0) {
      // Simple parsing - in production, use LLM to extract structured data
      for (const exp of parsed.sections.experience.slice(0, 10)) {
        // Basic extraction - you'd want more sophisticated parsing here
        await prisma.workExperience.create({
          data: {
            userProfileId: profile.id,
            company: 'Extracted Company', // Would need better parsing
            role: 'Extracted Role',
            description: exp,
          },
        });
      }
    }

    // Create education entries
    if (parsed.sections.education && parsed.sections.education.length > 0) {
      for (const edu of parsed.sections.education.slice(0, 5)) {
        await prisma.education.create({
          data: {
            userProfileId: profile.id,
            institution: 'Extracted Institution',
            degree: edu,
          },
        });
      }
    }

    // Create skills
    if (parsed.sections.skills && parsed.sections.skills.length > 0) {
      for (const skill of parsed.sections.skills.slice(0, 20)) {
        await prisma.skill.create({
          data: {
            userProfileId: profile.id,
            name: skill,
          },
        });
      }
    }

    // Fetch complete profile with relations
    const completeProfile = await prisma.userProfile.findUnique({
      where: { id: profile.id },
      include: {
        workExperiences: true,
        educations: true,
        skills: true,
      },
    });

    return NextResponse.json({
      success: true,
      profile: completeProfile,
      parsed,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process file' },
      { status: 500 }
    );
  }
}

