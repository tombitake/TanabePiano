import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    const users = await prisma.user.findMany({
      select: { email: true, role: true, name: true },
    });
    return NextResponse.json({
      ok: true,
      userCount,
      users,
      dbUrl: process.env.DATABASE_URL?.replace(/:([^:@]+)@/, ':***@'),
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      error: String(error),
      dbUrl: process.env.DATABASE_URL?.replace(/:([^:@]+)@/, ':***@'),
    }, { status: 500 });
  }
}
