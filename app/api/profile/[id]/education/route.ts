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
    const { institution, degree, startDate, endDate, gpa } = body;

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

    const { data: education, error } = await supabase
      .from('educations')
      .insert({
        user_profile_id: id,
        institution,
        degree,
        start_date: startDate,
        end_date: endDate,
        gpa,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(education, { status: 201 });
  } catch (error: any) {
    console.error('Error creating education:', error);
    return NextResponse.json(
      { error: 'Failed to create education' },
      { status: 500 }
    );
  }
}

