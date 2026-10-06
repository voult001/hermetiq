import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  let res = NextResponse.next({ 
    request: { headers: req.headers } 
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { 
          return req.cookies.getAll() 
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value))
          res = NextResponse.next({ 
            request: { headers: req.headers } 
          })
          cookiesToSet.forEach(({ name, value, options }) => 
            res.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // ESTO es el fix - getUser() no getSession()
  const { data: { user } } = await supabase.auth.getUser()

  // Si no hay user y entra a zona privada -> pa fuera
  if (!user && (req.nextUrl.pathname.startsWith('/dashboard') || req.nextUrl.pathname.startsWith('/host') || req.nextUrl.pathname.startsWith('/silo') || req.nextUrl.pathname.startsWith('/store'))) {
    const url = req.nextUrl.clone()
    url.pathname = '/signin'
    return NextResponse.redirect(url)
  }

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
