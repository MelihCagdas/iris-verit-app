import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/auth-server';
import { getSupabaseDb } from '@/lib/supabase-db';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; skillId: string }> }
) {
  try {
    const user = await getServerUser();
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, skillId } = await params;
    const body = await request.json();
    const { name, category, proficiency } = body;

    const supabase = await getSupabaseDb();

    // Verify skill belongs to user's profile
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const { data: skill, error } = await supabase
      .from('skills')
      .update({
        name,
        category,
        proficiency,
      })
      .eq('id', skillId)
      .eq('user_profile_id', id)
      .select()
      .single();

    if (error || !skill) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
    }

    return NextResponse.json(skill);
  } catch (error: any) {
    console.error('Error updating skill:', error);
    return NextResponse.json(
      { error: 'Failed to update skill' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; skillId: string }> }
) {
  try {
    const user = await getServerUser();
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, skillId } = await params;
    const supabase = await getSupabaseDb();

    // Verify skill belongs to user's profile
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
      .from('skills')
      .delete()
      .eq('id', skillId)
      .eq('user_profile_id', id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting skill:', error);
    return NextResponse.json(
      { error: 'Failed to delete skill' },
      { status: 500 }
    );
  }
}

