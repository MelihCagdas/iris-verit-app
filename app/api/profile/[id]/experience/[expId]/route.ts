import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; expId: string }> }
) {
  try {
    const { expId } = await params;
    const body = await request.json();
    const { company, role, startDate, endDate, description, achievements } = body;

    const experience = await prisma.workExperience.update({
      where: { id: expId },
      data: {
        company,
        role,
        startDate,
        endDate,
        description,
        achievements,
      },
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.error('Error updating experience:', error);
    return NextResponse.json(
      { error: 'Failed to update experience' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; expId: string }> }
) {
  try {
    const { expId } = await params;
    await prisma.workExperience.delete({
      where: { id: expId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return NextResponse.json(
      { error: 'Failed to delete experience' },
      { status: 500 }
    );
  }
}

