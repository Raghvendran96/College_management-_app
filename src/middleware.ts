import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Public paths don't need auth
  if (
    pathname === '/' ||
    pathname === '/register' ||
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') || 
    pathname.startsWith('/static') || 
    pathname === '/favicon.ico' ||
    pathname === '/login' ||
    pathname === '/manifest.json' ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|doc|pdf)$/)
  ) {
    return NextResponse.next()
  }

  const isLoggedIn = request.cookies.get('isLoggedIn')?.value

  // Only redirect if trying to access dashboard paths
  if (pathname.startsWith('/dashboard') && !isLoggedIn) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
