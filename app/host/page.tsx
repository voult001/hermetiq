"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function HostPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser()
      if (!data.user) { router.replace("/signin"); return }
      setUser(data.user)
      setLoading(false)
    }
    checkUser()
  }, [router])

  if (loading) return <div className="p-8 bg-black min-h-screen text-white">Loading...</div>

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <nav className="h-[64px] flex items-center justify-between px-6 border-b border-[#1A1A1A] bg-black">
        <div className="flex items-center gap-2 font-black text-xl">
          <span className="text-[#00FF88]">🛡️</span> SIGILLUQ • HOST
        </div>
        <div className="text-xs text-zinc-400">{user?.email}</div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-64px)]">
        {/* LEFT 50% - MY NODES */}
        <div className="p-8 bg-[#0A0A0A] border-r border-[#1A1A1A]">
          <h1 className="text-3xl font-bold">My Host Nodes</h1>
          <p className="text-zinc-400 text-sm mt-1 mb-8">Earn passive income • 3 active nodes</p>

          <div className="bg-[#141414] rounded-2xl border border-zinc-800/50 p-6 mb-6">
            <p className="text-[11px] tracking-widest text-zinc-500 uppercase">Total Earnings</p>
            <h2 className="text-4xl font-bold mt-2 text-[#00FF88]">$1,248.50</h2>
            <p className="text-xs text-zinc-500 mt-2">↗ +12% this month • 842 shards served</p>
            <button className="mt-6 w-full bg-[#00FF88] text-black font-bold py-3 rounded-xl">Withdraw Earnings</button>
          </div>

          <div className="bg-[#141414] rounded-2xl border border-zinc-800/50 overflow-hidden">
            <div className="px-5 py-3 text-[11px] text-zinc-500 uppercase tracking-widest border-b border-zinc-800">Node • Storage • Status</div>
            <div className="px-5 py-4 flex justify-between text-sm border-b border-zinc-800/50"><span>Node-01 • 500GB</span><span className="text-[#00FF88]">● Online</span></div>
            <div className="px-5 py-4 flex justify-between text-sm border-b border-zinc-800/50"><span>Node-02 • 1TB</span><span className="text-[#00FF88]">● Online</span></div>
            <div className="px-5 py-4 flex justify-between text-sm"><span>Node-03 • 2TB</span><span className="text-yellow-400">● Syncing</span></div>
          </div>
        </div>

        {/* RIGHT 50% - UPTIME & REWARDS - MISMO LOOK DE PUNTICOS */}
        <div className="p-10 bg-[#111111] flex flex-col items-center">
          <h2 className="text-[32px] font-bold">Network & Rewards</h2>
          <p className="text-zinc-400 text-sm mt-1 mb-10">Uptime • Payouts • Performance</p>

          <div className="relative w-[200px] h-[200px] mb-10">
            <div className="absolute inset-0 rounded-full border-[14px] border-zinc-800"></div>
            <div className="absolute inset-0 rounded-full border-[14px] border-[#00FF88] border-l-transparent rotate-12"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[48px] font-bold text-[#00FF88] leading-none">99.9%</span>
              <span className="text-xs text-zinc-400 mt-1">Uptime • 30 days</span>
            </div>
          </div>

          <div className="w-full border-2 border-dashed border-[#00FF88]/40 rounded-2xl p-8 bg-[#0A0A0A]/50">
            <p className="text-[11px] tracking-widest text-zinc-500 uppercase font-bold">HOST PERFORMANCE</p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-zinc-400">Shards Served</span><span className="font-bold">1,240</span></div>
              <div className="flex justify-between"><span className="text-zinc-400">Bandwidth Used</span><span className="font-bold">342GB</span></div>
              <div className="flex justify-between"><span className="text-zinc-400">Next Payout</span><span className="font-bold text-[#00FF88]">$84.20 in 2 days</span></div>
            </div>
            <button onClick={()=>router.push('/host/setup')} className="w-full mt-6 bg-[#1A1A1A] border border-zinc-800 py-3 rounded-xl font-bold text-sm">+ Add New Node</button>
          </div>

          <p className="text-[11px] text-zinc-500 mt-4">Host nodes encrypted • 🛡️ Auto-reward every 24h</p>
        </div>
      </div>
    </div>
  )
}
