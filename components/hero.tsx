import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="px-4 py-20 text-center">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
        Turn Your Extra<br />Space Into <span className="text-[#39FF14]">Cash</span>
      </h1>
      <p className="mx-auto mt-4 max-w-xl font-mono text-sm opacity-60">
        List your garage, shed, closet. Earn monthly. VaultBNB handles payments & protection.
      </p>
      
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/signup">
          <Button className="bg-[#39FF14] text-black hover:bg-[#39FF14]/90 rounded-full px-8 py-6 font-mono font-bold text-base">
            Sign Up
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="outline" className="rounded-full px-8 py-6 font-mono text-base border-white/20 bg-transparent hover:bg-white/10">
            Sign In
          </Button>
        </Link>
      </div>

      <div className="mt-6">
        <Link href="/host" className="font-mono text-xs opacity-50 hover:opacity-100 underline">
          Become a Host →
        </Link>
      </div>
    </section>
  )
}
