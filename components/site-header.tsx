"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function SiteHeader() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-14 items-center justify-between px-4 md:px-6">
        <Link href="/" className="font-mono font-bold tracking-widest text-[#39FF14]">
          SIGILLUQ
        </Link>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="font-mono text-xs text-zinc-400 hidden md:block">{user.email}</span>
              <Button onClick={handleSignOut} variant="outline" className="rounded-full px-5 font-mono border-white/20 bg-transparent text-white hover:bg-white hover:text-black">
                Sign Out
              </Button>
              <Link href="/vault">
                <Button className="rounded-full px-5 font-mono font-bold bg-[#39FF14] text-black hover:bg-[#39FF14]/90 border-0">
                  Vault
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button variant="outline" className="rounded-full px-5 font-mono border-white/20 bg-transparent text-white hover:bg-white hover:text-black">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-[#39FF14] text-black hover:bg-[#39FF14]/90 rounded-full px-5 font-mono font-bold border-0">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
