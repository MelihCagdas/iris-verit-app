import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; eduId: string }> }
) {
  try {
    const { eduId } = await params;
    const body = await request.json();
    const { institution, degree, startDate, endDate, gpa } = body;

    const education = await prisma.education.update({
      where: { id: eduId },
      data: {
        institution,
        degree,
        startDate,
        endDate,
        gpa,
      },
    });

    return NextResponse.json(education);
  } catch (error) {
    console.error('Error updating education:', error);
    return NextResponse.json(
      { error: 'Failed to update education' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; eduId: string }> }
) {
  try {
    const { eduId } = await params;
    await prisma.education.delete({
      where: { id: eduId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting education:', error);
    return NextResponse.json(
      { error: 'Failed to delete education' },
      { status: 500 }
    );
  }
}

