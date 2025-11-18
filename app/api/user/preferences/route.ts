import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/auth-server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const user = await getServerUser();

    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { jobTypes, seniorityLevel, completedWelcome } = body;

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
    return NextResponse.json(
      { error: 'Failed to save preferences' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getServerUser();

    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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

