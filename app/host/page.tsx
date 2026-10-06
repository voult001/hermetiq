"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === "/"

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto flex h-14 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-bold tracking-[0.2em] text-[#39FF14] text-[16px]">
            SIGILLUQ
          </span>
          <span className="hidden md:block text-[10px] tracking-widest text-zinc-500 border-l border-zinc-800 pl-3">
            616TB ENCRYPTED
          </span>
        </Link>

        {isHome? (
          <div className="flex items-center gap-3">
            <Link href="/signin">
              <Button variant="ghost" className="rounded-full px-5 h-9 text-xs text-zinc-400 hover:text-white hover:bg-transparent">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-[#39FF14] text-black hover:bg-[#39FF14]/90 rounded-full px-6 h-9 font-bold text-xs border-0 shadow-[0_0_15px_rgba(57,255,20,0.3)]">
                Sign Up
              </Button>
            </Link>
          </div>
        ) : (
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="rounded-full px-5 h-9 text-xs border-zinc-800 bg-transparent text-zinc-400 hover:text-white hover:border-zinc-700"
          >
            Sign Out
          </Button>
        )}
      </div>
    </header>
  )
}
