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
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-mono font-bold text-[#39FF14] tracking-widest">
          SIGILLUQ
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/host" className="font-mono text-sm opacity-70 hover:opacity-100">
            Become a Host
          </Link>

          {user ? (
            <>
              <span className="font-mono text-xs text-zinc-400 hidden md:block">{user.email}</span>
              <Button onClick={handleSignOut} variant="outline" className="rounded-full px-5 font-mono border-white/20 bg-transparent">
                Sign Out
              </Button>
              <Link href="/dashboard">
                <Button className="bg-[#39FF14] text-black hover:bg-[#39FF14]/90 rounded-full px-5 font-mono font-bold">
                  Vault
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button variant="outline" className="rounded-full px-5 font-mono border-white/20 bg-transparent">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-[#39FF14] text-black hover:bg-[#39FF14]/90 rounded-full px-5 font-mono font-bold">
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
