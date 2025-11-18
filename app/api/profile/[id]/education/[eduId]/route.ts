import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/auth-server';
import { getSupabaseDb } from '@/lib/supabase-db';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; eduId: string }> }
) {
  try {
    const user = await getServerUser();
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, eduId } = await params;
    const body = await request.json();
    const { institution, degree, startDate, endDate, gpa } = body;

    const supabase = await getSupabaseDb();

    // Verify education belongs to user's profile
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const { data: education, error } = await supabase
      .from('educations')
      .update({
        institution,
        degree,
        start_date: startDate,
        end_date: endDate,
        gpa,
      })
      .eq('id', eduId)
      .eq('user_profile_id', id)
      .select()
      .single();

    if (error || !education) {
      return NextResponse.json({ error: 'Education not found' }, { status: 404 });
    }

    return NextResponse.json(education);
  } catch (error: any) {
    console.error('Error updating education:', error);
    return NextResponse.json(
      { error: 'Failed to update education' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; eduId: string }> }
) {
  try {
    const user = await getServerUser();
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, eduId } = await params;
    const supabase = await getSupabaseDb();

    // Verify education belongs to user's profile
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
      .from('educations')
      .delete()
      .eq('id', eduId)
      .eq('user_profile_id', id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting education:', error);
    return NextResponse.json(
      { error: 'Failed to delete education' },
      { status: 500 }
    );
  }
}

