import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { institution, degree, startDate, endDate, gpa } = body;

    const education = await prisma.education.create({
      data: {
        userProfileId: params.id,
        institution,
        degree,
        startDate,
        endDate,
        gpa,
      },
    });

    return NextResponse.json(education, { status: 201 });
  } catch (error) {
    console.error('Error creating education:', error);
    return NextResponse.json(
      { error: 'Failed to create education' },
      { status: 500 }
    );
  }
}

