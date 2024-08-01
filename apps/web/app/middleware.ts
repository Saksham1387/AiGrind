import { NextResponse } from 'next/server';

export function middleware(req: { cookies: { get: (arg0: string) => any; }; url: string | URL | undefined; }) {
  const session = req.cookies.get('session');

  if (!session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard',
};