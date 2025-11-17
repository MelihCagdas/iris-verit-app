import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { company, role, startDate, endDate, description, achievements } = body;

    const experience = await prisma.workExperience.create({
      data: {
        userProfileId: params.id,
        company,
        role,
        startDate,
        endDate,
        description,
        achievements,
      },
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error('Error creating experience:', error);
    return NextResponse.json(
      { error: 'Failed to create experience' },
      { status: 500 }
    );
  }
}

