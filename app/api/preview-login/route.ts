import { NextResponse } from 'next/server';

const PREVIEW_COOKIE = 'preview-access';

export async function POST(request: Request) {
  const { password } = await request.json();
  const correct = process.env.PREVIEW_PASSWORD;

  if (!correct || password !== correct) {
    return NextResponse.json({ error: 'パスワードが違います' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(PREVIEW_COOKIE, correct, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30日
    path: '/',
  });
  return res;
}
