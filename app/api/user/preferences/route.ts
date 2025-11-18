import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/auth-server';
import { getSupabaseDb } from '@/lib/supabase-db';

export async function POST(request: NextRequest) {
  try {
    const user = await getServerUser();

    if (!user?.id) {
      console.error('Preferences POST: No user found', { 
        hasUser: !!user,
        userId: user?.id 
      });
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { jobTypes, seniorityLevel, completedWelcome } = body;

    const supabase = await getSupabaseDb();

    // Upsert user preferences
    const { data: preferences, error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: user.id,
        job_types: jobTypes || [],
        seniority_level: seniorityLevel || null,
        completed_welcome: completedWelcome ?? true,
      }, {
        onConflict: 'user_id',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return NextResponse.json({ success: true, preferences });
  } catch (error: any) {
    console.error('Preferences error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: error.message || 'Failed to save preferences', details: error.code },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getServerUser();

    if (!user?.id) {
      console.error('Preferences GET: No user found', { 
        hasUser: !!user,
        userId: user?.id 
      });
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await getSupabaseDb();

    const { data: preferences, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = not found, which is OK
      console.error('Supabase error:', error);
      throw error;
    }

    return NextResponse.json({ preferences: preferences || null });
  } catch (error: any) {
    console.error('Get preferences error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch preferences' },
      { status: 500 }
    );
  }
}

