"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ChooseRolePage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="container flex h-14 items-center justify-between px-4 md:px-6">
          <Link href="/" className="font-mono font-bold tracking-widest text-[#39FF14]">SIGILLUQ</Link>
          <button onClick={async()=>{
            const {createClient} = await import('@supabase/supabase-js')
            const supa = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
            await supa.auth.signOut()
            window.location.href='/'
          }} className="font-mono text-xs rounded-full px-5 py-2 border border-white/20 bg-transparent text-white hover:bg-white hover:text-black transition">
            Sign Out
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center px-6 py-14 md:py-20">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3">Choose Your Path</h1>
          <p className="font-mono text-xs md:text-sm text-zinc-400">Select how you want to use Sigilluq</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 w-full max-w-4xl">
          {/* CARD 1 - HOST */}
          <div className="rounded-[20px] border border-white/10 bg-zinc-900/60 p-7 hover:border-[#39FF14]/30 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="h-10 w-10 rounded-full bg-[#39FF14]/15 border border-[#39FF14]/20 flex items-center justify-center font-mono text-[#39FF14]">$</div>
              <span className="font-mono text-[10px] tracking-widest px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-400">HOSTS</span>
            </div>
            <h2 className="font-mono font-bold text-lg tracking-widest mb-2">EARN PASSIVE INCOME</h2>
            <p className="font-mono text-[13px] text-zinc-400 leading-relaxed mb-6">Turn your extra storage into monthly revenue. Set your price, keep 90%.</p>
            <button onClick={() => router.push('/host')} className="w-full rounded-full bg-[#39FF14] text-black font-mono font-bold text-sm py-3.5 hover:bg-[#39FF14]/90 transition border-0">
              Continue as Host →
            </button>
          </div>

          {/* CARD 2 - SILO - 616TB */}
          <div className="rounded-[20px] border border-white/10 bg-zinc-900/60 p-7 hover:border-[#39FF14]/30 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="h-10 w-10 rounded-full bg-[#39FF14]/15 border border-[#39FF14]/20 flex items-center justify-center font-mono text-[#39FF14]">◍</div>
              <span className="font-mono text-[10px] tracking-widest px-3 py-1 rounded-full border border-[#39FF14]/20 bg-[#39FF14]/10 text-[#39FF14]">616TB SILO</span>
            </div>
            <h2 className="font-mono font-bold text-lg tracking-widest mb-2">SECURE YOUR DATA</h2>
            <p className="font-mono text-[13px] text-zinc-400 leading-relaxed mb-6">Military-grade encryption in a fleet of Sigilluq hosts. Encrypted by you, invisible to everyone. 616TB Encrypted.</p>
            <button onClick={() => router.push('/silo')} className="w-full rounded-full bg-[#39FF14] text-black font-mono font-bold text-sm py-3.5 hover:bg-[#39FF14]/90 transition border-0">
              Continue as Silo →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
