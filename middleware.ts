import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const PREVIEW_COOKIE = 'preview-access';

function isExemptFromPreviewGate(pathname: string): boolean {
  return (
    pathname === '/preview-login' ||
    pathname.startsWith('/api/preview-login') ||
    pathname.startsWith('/api/auth')
  );
}

function hasPreviewAccess(req: NextRequest): boolean {
  const password = process.env.PREVIEW_PASSWORD;
  if (!password) return true; // 環境変数未設定時はゲートなし
  return req.cookies.get(PREVIEW_COOKIE)?.value === password;
}

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // プレビューゲートチェック
    if (!isExemptFromPreviewGate(pathname) && !hasPreviewAccess(req)) {
      const url = new URL('/preview-login', req.url);
      if (pathname !== '/') url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }

    // 先生ルートのロールチェック
    const token = req.nextauth.token;
    if (pathname.startsWith('/teacher') && token?.role !== 'TEACHER') {
      return NextResponse.redirect(new URL('/login?error=AccessDenied', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        if (isExemptFromPreviewGate(pathname)) return true;
        if (pathname.startsWith('/student') || pathname.startsWith('/teacher')) return !!token;
        return true;
      },
    },
    pages: { signIn: '/login' },
  }
);

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)$).*)',
  ],
};
