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
      setUser(session?.user?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-[64px] items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-mono font-black tracking-[0.2em] text-[#39FF14] text-[18px]">
            SIGILLUQ
          </span>
          <span className="hidden md:block font-mono text-[10px] tracking-widest text-zinc-500 border-l border-white/10 pl-3">
            616TB ENCRYPTED
          </span>
        </Link>
        <div className="flex items-center gap-3">
          {user? (
            <>
              <span className="font-mono text-xs text-zinc-400 hidden lg:block max-w-[160px] truncate">{user.email}</span>
              <Button onClick={handleSignOut} variant="outline" className="rounded-full px-5 h-9 font-mono text-xs border-white/20 bg-transparent text-white hover:bg-white hover:text-black">
                Sign Out
              </Button>
              <Link href="/vault">
                <Button className="rounded-full px-6 h-9 font-mono font-bold text-xs bg-[#39FF14] text-black hover:bg-[#39FF14]/90 border-0 shadow-[0_0_20px_rgba(57,255,20,0.3)]">
                  Vault →
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button variant="ghost" className="rounded-full px-5 h-9 font-mono text-xs text-zinc-300 hover:text-white hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-[#39FF14] text-black hover:bg-[#39FF14]/90 rounded-full px-6 h-9 font-mono font-bold text-xs border-0 shadow-[0_0_20px_rgba(57,255,20,0.3)]">
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
