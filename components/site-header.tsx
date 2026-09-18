import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
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
          <Link href="/signup">
            <Button variant="outline" className="rounded-full px-5 font-mono border-white/20 bg-transparent">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-[#39FF14] text-black hover:bg-[#39FF14]/90 rounded-full px-5 font-mono font-bold">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
