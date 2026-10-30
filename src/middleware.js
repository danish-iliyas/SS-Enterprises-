import { NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySession } from '@/lib/session';

// Redirects to the login page when an admin page is opened without a valid session.
export async function middleware(req) {
  const { pathname } = req.nextUrl;
  if (pathname === '/admin/login') return NextResponse.next();

  const session = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);
  if (!session) {
    const url = new URL('/admin/login', req.url);
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*'] };
