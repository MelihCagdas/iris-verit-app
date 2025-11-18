import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/auth-server';
import { getSupabaseDb } from '@/lib/supabase-db';

export async function POST(
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
    const { name, category, proficiency } = body;

    const supabase = await getSupabaseDb();

    // Verify profile belongs to user
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
      .insert({
        user_profile_id: id,
        name,
        category,
        proficiency,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(skill, { status: 201 });
  } catch (error: any) {
    console.error('Error creating skill:', error);
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    );
  }
}

