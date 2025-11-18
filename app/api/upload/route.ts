import { NextRequest, NextResponse } from 'next/server';
import { saveFile, isValidResumeFile, getFileExtension } from '@/lib/fileStorage';
import { parseResumeBuffer } from '@/lib/resumeParser';
import { getServerUser } from '@/lib/auth-server';
import { getSupabaseDb } from '@/lib/supabase-db';
import { randomUUID } from 'crypto';

// Mark this route as dynamic to prevent static analysis during build
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const user = await getServerUser();
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const ext = getFileExtension(file.name);
    const filename = `${randomUUID()}.${ext}`;
    const fileUrl = await saveFile(buffer, filename);

    // Parse the resume
    const parsed = await parseResumeBuffer(buffer, filename);

    const supabase = await getSupabaseDb();

    // Create user profile linked to authenticated user
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        user_id: user.id,
        name: parsed.personalInfo?.name || '',
        email: parsed.personalInfo?.email || '',
        phone: parsed.personalInfo?.phone || '',
        location: parsed.personalInfo?.location || '',
        summary: parsed.sections.summary || '',
        original_file_url: fileUrl,
      })
      .select()
      .single();

    if (profileError || !profile) {
      throw profileError || new Error('Failed to create profile');
    }

    // Create work experiences if parsed
    if (parsed.sections.experience && parsed.sections.experience.length > 0) {
      const experiences = parsed.sections.experience.slice(0, 10).map((exp) => ({
        user_profile_id: profile.id,
        company: 'Extracted Company', // Would need better parsing
        role: 'Extracted Role',
        description: exp,
      }));

      if (experiences.length > 0) {
        await supabase.from('work_experiences').insert(experiences);
      }
    }

    // Create education entries
    if (parsed.sections.education && parsed.sections.education.length > 0) {
      const educations = parsed.sections.education.slice(0, 5).map((edu) => ({
        user_profile_id: profile.id,
        institution: 'Extracted Institution',
        degree: edu,
      }));

      if (educations.length > 0) {
        await supabase.from('educations').insert(educations);
      }
    }

    // Create skills
    if (parsed.sections.skills && parsed.sections.skills.length > 0) {
      const skills = parsed.sections.skills.slice(0, 20).map((skill) => ({
        user_profile_id: profile.id,
        name: skill,
      }));

      if (skills.length > 0) {
        await supabase.from('skills').insert(skills);
      }
    }

    // Fetch complete profile with relations
    const [experiences, educations, skills] = await Promise.all([
      supabase
        .from('work_experiences')
        .select('*')
        .eq('user_profile_id', profile.id),
      supabase
        .from('educations')
        .select('*')
        .eq('user_profile_id', profile.id),
      supabase
        .from('skills')
        .select('*')
        .eq('user_profile_id', profile.id),
    ]);

    const completeProfile = {
      ...profile,
      workExperiences: experiences.data || [],
      educations: educations.data || [],
      skills: skills.data || [],
    };

    return NextResponse.json({
      success: true,
      profile: completeProfile,
      parsed,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process file' },
      { status: 500 }
    );
  }
}

