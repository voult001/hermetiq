"use client"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export function HostDashboard() {
  const [totalGB, setTotalGB] = useState(0)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase.from("hosts").select("*")
      if (data) {
        let sum = 0
        for (const r of data) {
          sum += Number((r as any).freeGB || (r as any).free_gb || 0)
        }
        setTotalGB(sum)
      }
    }
    load()
  }, [])

  const tb = (totalGB / 1000).toFixed(1) + " TB"

  return (
    <div className="flex h-full flex-col border-l border-white/10 bg-white/[0.02] p-6">
      <h2 className="mb-6 text-lg font-bold">Host Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-lg font-bold">{tb}</div>
          <div className="text-xs opacity-50">Shared</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-lg font-bold">99.2%</div>
          <div className="text-xs opacity-50">Uptime</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-lg font-bold">5.0</div>
          <div className="text-xs opacity-50">Rating</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-lg font-bold">3</div>
          <div className="text-xs opacity-50">Active Deals</div>
        </div>
      </div>
      <p className="mt-4 font-mono text-xs opacity-40">{totalGB} GB total from Supabase</p>
    </div>
  )
}
