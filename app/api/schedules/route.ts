import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (session.user.role === 'TEACHER') {
      // Teacher can see all schedules
      const schedules = await prisma.schedule.findMany({
        include: {
          student: {
            select: { id: true, name: true, email: true },
          },
        },
        orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
      });
      return NextResponse.json(schedules);
    } else {
      // Students see their own schedules + public schedules
      const schedules = await prisma.schedule.findMany({
        where: {
          OR: [
            { studentId: session.user.id },
            { isPublic: true },
          ],
        },
        include: {
          student: {
            select: { id: true, name: true, email: true },
          },
        },
        orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
      });
      return NextResponse.json(schedules);
    }
  } catch (error) {
    console.error('Error fetching schedules:', error);
    return NextResponse.json({ error: 'Failed to fetch schedules' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, date, startTime, endTime, description, studentId, isPublic } = body;

    if (!title || !date || !startTime || !endTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const schedule = await prisma.schedule.create({
      data: {
        title,
        date,
        startTime,
        endTime,
        description: description || null,
        studentId: studentId || null,
        isPublic: isPublic ?? false,
      },
      include: {
        student: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json(schedule, { status: 201 });
  } catch (error) {
    console.error('Error creating schedule:', error);
    return NextResponse.json({ error: 'Failed to create schedule' }, { status: 500 });
  }
}
