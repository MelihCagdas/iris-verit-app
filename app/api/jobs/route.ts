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

    const { data: jobs, error } = await supabase
      .from('job_postings')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(jobs || []);
  } catch (error: any) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
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
    const { title, company, rawText } = body;

    if (!rawText) {
      return NextResponse.json(
        { error: 'Job description text is required' },
        { status: 400 }
      );
    }

    const supabase = await getSupabaseDb();

    const { data: job, error } = await supabase
      .from('job_postings')
      .insert({
        user_id: user.id,
        title: title || '',
        company: company || '',
        raw_text: rawText,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(job, { status: 201 });
  } catch (error: any) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Failed to create job posting' },
      { status: 500 }
    );
  }
}

