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

    // Fetch tailored resumes
    const { data: resumes, error } = await supabase
      .from('tailored_resumes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(resumes || []);
  } catch (error: any) {
    console.error('Error fetching tailored resumes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tailored resumes' },
      { status: 500 }
    );
  }
}

