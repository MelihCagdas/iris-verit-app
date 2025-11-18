import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/auth-server';
import { getSupabaseDb } from '@/lib/supabase-db';
import { tailorResume, ProfileData, JobDescription } from '@/lib/resumeTailor';
import { validateTailoredResume } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const user = await getServerUser();
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { profileId, jobId } = body;

    if (!profileId || !jobId) {
      return NextResponse.json(
        { error: 'Profile ID and Job ID are required' },
        { status: 400 }
      );
    }

    const supabase = await getSupabaseDb();

    // Fetch profile with all relations
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', profileId)
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Fetch relations
    const [experiences, educations, skills, job] = await Promise.all([
      supabase
        .from('work_experiences')
        .select('*')
        .eq('user_profile_id', profileId),
      supabase
        .from('educations')
        .select('*')
        .eq('user_profile_id', profileId),
      supabase
        .from('skills')
        .select('*')
        .eq('user_profile_id', profileId),
      supabase
        .from('job_postings')
        .select('*')
        .eq('id', jobId)
        .eq('user_id', user.id)
        .single(),
    ]);

    if (!job.data) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Prepare data for tailoring
    const profileData: ProfileData = {
      name: profile.name || undefined,
      email: profile.email || undefined,
      phone: profile.phone || undefined,
      location: profile.location || undefined,
      summary: profile.summary || undefined,
      workExperiences: (experiences.data || []).map((exp: any) => ({
        id: exp.id,
        company: exp.company,
        role: exp.role,
        startDate: exp.start_date || undefined,
        endDate: exp.end_date || undefined,
        description: exp.description || undefined,
        achievements: exp.achievements || undefined,
      })),
      educations: (educations.data || []).map((edu: any) => ({
        id: edu.id,
        institution: edu.institution,
        degree: edu.degree || undefined,
        startDate: edu.start_date || undefined,
        endDate: edu.end_date || undefined,
        gpa: edu.gpa || undefined,
      })),
      skills: (skills.data || []).map((skill: any) => ({
        id: skill.id,
        name: skill.name,
        category: skill.category || undefined,
        proficiency: skill.proficiency || undefined,
      })),
    };

    const jobDescription: JobDescription = {
      title: job.data.title || undefined,
      company: job.data.company || undefined,
      rawText: job.data.raw_text,
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

    // Save tailored resume to database
    const { data: savedResume, error: saveError } = await supabase
      .from('tailored_resumes')
      .insert({
        user_id: user.id,
        user_profile_id: profileId,
        job_posting_id: jobId,
        tailored_data: tailored,
      })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving tailored resume:', saveError);
      // Still return the tailored resume even if save fails
    }

    return NextResponse.json({
      tailored,
      validation,
      profile: profileData,
      job: jobDescription,
      savedResumeId: savedResume?.id,
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

