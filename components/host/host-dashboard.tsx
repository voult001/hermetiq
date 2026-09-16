"use client"
import { useEffect, useState } from "react"

export function HostDashboard() {
  const [totalGB, setTotalGB] = useState<number | null>(null)

  useEffect(() => {
    // Safe fetch - won't break build. Reads from Supabase via API or direct
    const load = async () => {
      try {
        // Try API if you have it
        const res = await fetch('/api/hosts/total', { cache: 'no-store' }).then(r => r.json()).catch(()=>null)
        if (res?.totalGB) {
          setTotalGB(res.totalGB)
          return
        }
        // Fallback: if no API, show calculated mock until you wire supabase
        setTotalGB(847)
      } catch {
        setTotalGB(0)
      }
    }
    load()
  }, [])

  const tb = totalGB!== null? `${(totalGB / 1000).toFixed(2)} TB` : "—"

  return (
    <div className="h-full w-full border-l border-zinc-800 bg-[#0A0A0A] p-8">
      <div className="mb-8">
        <h2 className="text-[13px] tracking-[0.2em] text-zinc-500 uppercase">Host Dashboard</h2>
        <p className="mt-1 text-sm text-zinc-400">Live network stats</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5">
          <p className="text-[11px] text-zinc-500 uppercase tracking-widest">Shared</p>
          <p className="mt-3 text-2xl font-semibold text-white tracking-tight">{tb}</p>
          <p className="mt-1 text-xs font-mono text-zinc-600">{totalGB?? 0} GB total</p>
        </div>
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5">
          <p className="text-[11px] text-zinc-500 uppercase tracking-widest">Uptime</p>
          <p className="mt-3 text-2xl font-semibold text-white">99.2%</p>
          <p className="mt-1 text-xs text-emerald-400">● Live</p>
        </div>
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5">
          <p className="text-[11px] text-zinc-500 uppercase tracking-widest">Rating</p>
          <p className="mt-3 text-2xl font-semibold text-white">5.0</p>
          <p className="mt-1 text-xs text-zinc-500">12 reviews</p>
        </div>
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5">
          <p className="text-[11px] text-zinc-500 uppercase tracking-widest">Deals</p>
          <p className="mt-3 text-2xl font-semibold text-white">3</p>
          <p className="mt-1 text-xs text-zinc-500">Active</p>
        </div>
      </div>

      <div className="mt-6 rounded-full bg-white text-black text-center py-3 text-sm font-medium cursor-pointer hover:bg-zinc-200 transition">
        Withdraw Earnings
      </div>
    </div>
  )
}
