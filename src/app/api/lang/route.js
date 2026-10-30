import { NextResponse } from 'next/server';
import { LANG_COOKIE, normaliseLang } from '@/lib/i18n';

// No-JavaScript fallback for the language switcher: sets the cookie and returns to the page.
export function GET(req) {
  const sp = req.nextUrl.searchParams;
  const next = sp.get('next') || '/';
  const target = next.startsWith('/') && !next.startsWith('//') ? next : '/';
  const res = NextResponse.redirect(new URL(target, req.url), 303);
  res.cookies.set(LANG_COOKIE, normaliseLang(sp.get('l')), { path: '/', maxAge: 31536000, sameSite: 'lax' });
  return res;
}
