import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

// GET — 全員アクセス可（認証不要）
export async function GET() {
  try {
    const studioDays = await prisma.studioDay.findMany({
      orderBy: { date: 'asc' },
    });
    return NextResponse.json(studioDays);
  } catch (error) {
    console.error('Error fetching studio days:', error);
    return NextResponse.json({ error: 'Failed to fetch studio days' }, { status: 500 });
  }
}

// POST — 講師のみ：開講日を追加（同じ日付なら upsert）
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { date, note } = await request.json();
    if (!date) {
      return NextResponse.json({ error: 'date is required' }, { status: 400 });
    }

    const day = await prisma.studioDay.upsert({
      where: { date },
      create: { date, note: note || null },
      update: { note: note || null },
    });
    return NextResponse.json(day, { status: 201 });
  } catch (error) {
    console.error('Error creating studio day:', error);
    return NextResponse.json({ error: 'Failed to create studio day' }, { status: 500 });
  }
}

// DELETE — 講師のみ：開講日を削除
export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { date } = await request.json();
    if (!date) {
      return NextResponse.json({ error: 'date is required' }, { status: 400 });
    }

    await prisma.studioDay.delete({ where: { date } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting studio day:', error);
    return NextResponse.json({ error: 'Not found or failed' }, { status: 404 });
  }
}
