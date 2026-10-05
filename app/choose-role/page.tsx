"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ChooseRolePage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto flex h-14 items-center justify-between px-6">
          <Link href="/" className="font-bold tracking-widest text-[#39FF14]">SIGILLUQ</Link>
          <button onClick={async()=>{
            const {createClient} = await import('@supabase/supabase-js')
            const supa = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
            await supa.auth.signOut()
            window.location.href='/'
          }} className="text-xs rounded-full px-5 py-2 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition">
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Choose Your Path</h1>
          <p className="text-sm text-zinc-500">Select how you want to use Sigilluq</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">

          {/* HOST */}
          <div className="bg-[#111] border border-zinc-800 rounded-[28px] p-10 min-h-[520px] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 rounded-2xl bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center text-[#39FF14] font-bold text-lg">$</div>
                <span className="text-[10px] tracking-widest px-3 py-1.5 rounded-full border border-zinc-800 bg-black text-zinc-500">HOSTS</span>
              </div>
              <h2 className="font-bold text-[22px] tracking-tight mb-4">EARN PASSIVE INCOME</h2>
              <p className="text-[14px] text-zinc-400 leading-relaxed">Turn extra storage into monthly revenue. The more you share, the more you earn.</p>
            </div>
            <button onClick={() => router.push('/host')} className="w-full rounded-full bg-[#39FF14] text-black font-bold text-[15px] py-4 mt-10 hover:bg-[#39FF14]/90 transition">
              Continue as Host →
            </button>
          </div>

          {/* SILO - RESET A 0 */}
          <div className="bg-[#111] border border-zinc-800 rounded-[28px] p-10 min-h-[520px] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 rounded-2xl bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center text-[#39FF14] font-bold text-lg">◍</div>
                <span className="text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full border border-[#39FF14]/20 bg-[#39FF14]/10 text-[#39FF14]">V2 SILO</span>
              </div>
              <h2 className="font-bold text-[22px] tracking-tight mb-4">SECURE YOUR DATA</h2>
              <p className="text-[14px] text-zinc-400 leading-relaxed">Military-grade encryption in a fleet of Sigilluq hosts. Encrypted by you, invisible to everyone. Patent pending • Starting from zero.</p>
            </div>
            <button onClick={() => router.push('/silo')} className="w-full rounded-full bg-[#39FF14] text-black font-bold text-[15px] py-4 mt-10 hover:bg-[#39FF14]/90 transition">
              Continue as Silo →
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
