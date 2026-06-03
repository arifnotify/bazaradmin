import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token =
    req.cookies.get('admin_token')?.value ||
    req.headers.get('authorization');

  if (
    !token &&
    req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(
      new URL('/login', req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
//https://chatgpt.com/share/6a203982-f570-838d-9200-d9a209a38000
