import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/auth-server';
import { getSupabaseDb } from '@/lib/supabase-db';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; expId: string }> }
) {
  try {
    const user = await getServerUser();
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, expId } = await params;
    const body = await request.json();
    const { company, role, startDate, endDate, description, achievements } = body;

    const supabase = await getSupabaseDb();

    // Verify experience belongs to user's profile
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const { data: experience, error } = await supabase
      .from('work_experiences')
      .update({
        company,
        role,
        start_date: startDate,
        end_date: endDate,
        description,
        achievements,
      })
      .eq('id', expId)
      .eq('user_profile_id', id)
      .select()
      .single();

    if (error || !experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    return NextResponse.json(experience);
  } catch (error: any) {
    console.error('Error updating experience:', error);
    return NextResponse.json(
      { error: 'Failed to update experience' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; expId: string }> }
) {
  try {
    const user = await getServerUser();
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, expId } = await params;
    const supabase = await getSupabaseDb();

    // Verify experience belongs to user's profile
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const { error } = await supabase
      .from('work_experiences')
      .delete()
      .eq('id', expId)
      .eq('user_profile_id', id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting experience:', error);
    return NextResponse.json(
      { error: 'Failed to delete experience' },
      { status: 500 }
    );
  }
}

