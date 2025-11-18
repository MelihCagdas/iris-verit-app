import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/auth-server';
import { getSupabaseDb } from '@/lib/supabase-db';

export async function GET(request: NextRequest) {
  try {
    const user = await getServerUser();
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await getSupabaseDb();

    // Fetch profiles for the authenticated user
    const { data: profiles, error: profilesError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (profilesError) {
      throw profilesError;
    }

    // Fetch relations for each profile
    const profilesWithRelations = await Promise.all(
      (profiles || []).map(async (profile) => {
        const [experiences, educations, skills] = await Promise.all([
          supabase
            .from('work_experiences')
            .select('*')
            .eq('user_profile_id', profile.id)
            .order('start_date', { ascending: false }),
          supabase
            .from('educations')
            .select('*')
            .eq('user_profile_id', profile.id)
            .order('start_date', { ascending: false }),
          supabase
            .from('skills')
            .select('*')
            .eq('user_profile_id', profile.id)
            .order('name', { ascending: true }),
        ]);

        return {
          ...profile,
          workExperiences: experiences.data || [],
          educations: educations.data || [],
          skills: skills.data || [],
        };
      })
    );

    return NextResponse.json(profilesWithRelations);
  } catch (error: any) {
    console.error('Error fetching profiles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profiles' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getServerUser();
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, phone, location, summary, originalFileUrl } = body;

    const supabase = await getSupabaseDb();

    const { data: profile, error } = await supabase
      .from('user_profiles')
      .insert({
        user_id: user.id,
        name,
        email,
        phone,
        location,
        summary,
        original_file_url: originalFileUrl,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Return profile with empty relations
    return NextResponse.json({
      ...profile,
      workExperiences: [],
      educations: [],
      skills: [],
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating profile:', error);
    return NextResponse.json(
      { error: 'Failed to create profile' },
      { status: 500 }
    );
  }
}

