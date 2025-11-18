import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/auth-server';
import { getSupabaseDb } from '@/lib/supabase-db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getServerUser();
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const supabase = await getSupabaseDb();

    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Fetch relations
    const [experiences, educations, skills] = await Promise.all([
      supabase
        .from('work_experiences')
        .select('*')
        .eq('user_profile_id', id)
        .order('start_date', { ascending: false }),
      supabase
        .from('educations')
        .select('*')
        .eq('user_profile_id', id)
        .order('start_date', { ascending: false }),
      supabase
        .from('skills')
        .select('*')
        .eq('user_profile_id', id)
        .order('name', { ascending: true }),
    ]);

    return NextResponse.json({
      ...profile,
      workExperiences: experiences.data || [],
      educations: educations.data || [],
      skills: skills.data || [],
    });
  } catch (error: any) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getServerUser();
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, email, phone, location, summary } = body;

    const supabase = await getSupabaseDb();

    const { data: profile, error } = await supabase
      .from('user_profiles')
      .update({
        name,
        email,
        phone,
        location,
        summary,
      })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error || !profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Fetch relations
    const [experiences, educations, skills] = await Promise.all([
      supabase
        .from('work_experiences')
        .select('*')
        .eq('user_profile_id', id),
      supabase
        .from('educations')
        .select('*')
        .eq('user_profile_id', id),
      supabase
        .from('skills')
        .select('*')
        .eq('user_profile_id', id),
    ]);

    return NextResponse.json({
      ...profile,
      workExperiences: experiences.data || [],
      educations: educations.data || [],
      skills: skills.data || [],
    });
  } catch (error: any) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getServerUser();
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const supabase = await getSupabaseDb();

    const { error } = await supabase
      .from('user_profiles')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting profile:', error);
    return NextResponse.json(
      { error: 'Failed to delete profile' },
      { status: 500 }
    );
  }
}

