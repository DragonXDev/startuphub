import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  // Protected routes that require authentication
  const protectedRoutes = ['/settings', '/projects']
  
  if (!session && protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }

  // If user is signed in and tries to access auth pages, redirect to home
  if (session && req.nextUrl.pathname.startsWith('/auth/')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
