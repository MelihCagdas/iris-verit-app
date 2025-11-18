import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/auth-server';
import { prisma } from '@/lib/prisma';

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

    // First, ensure the User record exists in Prisma (for foreign key constraint)
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        email: user.email || undefined,
        name: user.user_metadata?.name || user.email || undefined,
        image: user.user_metadata?.avatar_url || undefined,
        emailVerified: user.email_confirmed_at ? new Date(user.email_confirmed_at) : undefined,
      },
      create: {
        id: user.id,
        email: user.email || undefined,
        name: user.user_metadata?.name || user.email || undefined,
        image: user.user_metadata?.avatar_url || undefined,
        emailVerified: user.email_confirmed_at ? new Date(user.email_confirmed_at) : undefined,
        provider: 'supabase',
      },
    });

    // Upsert user preferences
    const preferences = await prisma.userPreferences.upsert({
      where: { userId: user.id },
      update: {
        jobTypes: jobTypes || [],
        seniorityLevel: seniorityLevel || null,
        completedWelcome: completedWelcome ?? true,
      },
      create: {
        userId: user.id,
        jobTypes: jobTypes || [],
        seniorityLevel: seniorityLevel || null,
        completedWelcome: completedWelcome ?? true,
      },
    });

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

    // Ensure User record exists (for foreign key constraint)
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        email: user.email || undefined,
        name: user.user_metadata?.name || user.email || undefined,
        image: user.user_metadata?.avatar_url || undefined,
        emailVerified: user.email_confirmed_at ? new Date(user.email_confirmed_at) : undefined,
      },
      create: {
        id: user.id,
        email: user.email || undefined,
        name: user.user_metadata?.name || user.email || undefined,
        image: user.user_metadata?.avatar_url || undefined,
        emailVerified: user.email_confirmed_at ? new Date(user.email_confirmed_at) : undefined,
        provider: 'supabase',
      },
    });

    const preferences = await prisma.userPreferences.findUnique({
      where: { userId: user.id },
    });

    return NextResponse.json({ preferences });
  } catch (error: any) {
    console.error('Get preferences error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch preferences' },
      { status: 500 }
    );
  }
}

