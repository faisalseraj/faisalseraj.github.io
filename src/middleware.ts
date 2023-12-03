import { NextRequest, NextResponse } from 'next/server';
import { routes } from './shared/routes';

export function middleware(request: NextRequest) {
  console.log(request.nextUrl.pathname);

  if (request.nextUrl.pathname == '/') {
    return NextResponse.redirect(new URL(routes.lab.dashboard, request.url));
  }
}

export const config = {
  matcher: ['/participants/dashboard']
};
