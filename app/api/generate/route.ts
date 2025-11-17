import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { tailorResume, ProfileData, JobDescription } from '@/lib/resumeTailor';
import { validateTailoredResume } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { profileId, jobId } = body;

    if (!profileId || !jobId) {
      return NextResponse.json(
        { error: 'Profile ID and Job ID are required' },
        { status: 400 }
      );
    }

    // Fetch profile with all relations
    const profile = await prisma.userProfile.findUnique({
      where: { id: profileId },
      include: {
        workExperiences: true,
        educations: true,
        skills: true,
      },
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Fetch job posting
    const job = await prisma.jobPosting.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Prepare data for tailoring
    const profileData: ProfileData = {
      name: profile.name || undefined,
      email: profile.email || undefined,
      phone: profile.phone || undefined,
      location: profile.location || undefined,
      summary: profile.summary || undefined,
      workExperiences: profile.workExperiences.map((exp) => ({
        id: exp.id,
        company: exp.company,
        role: exp.role,
        startDate: exp.startDate || undefined,
        endDate: exp.endDate || undefined,
        description: exp.description || undefined,
        achievements: exp.achievements || undefined,
      })),
      educations: profile.educations.map((edu) => ({
        id: edu.id,
        institution: edu.institution,
        degree: edu.degree || undefined,
        startDate: edu.startDate || undefined,
        endDate: edu.endDate || undefined,
        gpa: edu.gpa || undefined,
      })),
      skills: profile.skills.map((skill) => ({
        id: skill.id,
        name: skill.name,
        category: skill.category || undefined,
        proficiency: skill.proficiency || undefined,
      })),
    };

    const jobDescription: JobDescription = {
      title: job.title || undefined,
      company: job.company || undefined,
      rawText: job.rawText,
    };

    // Generate tailored resume
    const tailored = await tailorResume(profileData, jobDescription);

    // Validate the tailored resume
    const validation = validateTailoredResume(tailored, profileData);

    if (!validation.isValid) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          validation,
          tailored, // Still return it for debugging
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      tailored,
      validation,
      profile: profileData,
      job: jobDescription,
    });
  } catch (error: any) {
    console.error('Error generating resume:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate tailored resume',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

