"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { HardDrive, Activity, Star, Handshake } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { LiveFeed } from "./live-feed"
import { NetworkMap } from "./network-map"
import { EarningsChart } from "./earnings-chart"
import { createClient } from "@/lib/supabase/client"

const CHUNKS = Array.from({ length: 48 }, (_, i) => ({
  id: i,
  active: Math.random() > 0.35,
}))

export function HostDashboard() {
  const [totalGB, setTotalGB] = useState(0)

  useEffect(() => {
    async function fetchTotal() {
      const supabase = createClient()
      const { data } = await supabase.from("hosts").select("*")
      if (data) {
        const sum = data.reduce((acc: number, row: any) => acc + Number(row.freeGB || row.free_gb || 0), 0)
        setTotalGB(sum)
      }
    }
    fetchTotal()
  }, [])

  const STATS = [
    { icon: HardDrive, value: `${(totalGB / 1000).toFixed(1)} TB`, label: "Shared" },
    { icon: Activity, value: "99.2%", label: "Uptime" },
    { icon: Star, value: "5.0", label: "Rating" },
    { icon: Handshake, value: "3", label: "Active Deals" },
  ]

  return (
    <div className="flex h-full flex-col border-l border-white/10 bg-white/[0.02] p-6">
      <Tabs defaultValue="overview" className="flex h-full flex-col">
        <TabsList className="w-full justify-start gap-1 bg-transparent p-0">
          <TabsTrigger value="overview" className="rounded-md font-mono text-xs capitalize text-white/50 data-[state=active]:bg-[#00ff88]/10 data-[state=active]:text-[#00ff88]">overview</TabsTrigger>
          <TabsTrigger value="chunks" className="rounded-md font-mono text-xs capitalize text-white/50 data-[state=active]:bg-[#00ff88]/10 data-[state=active]:text-[#00ff88]">chunks</TabsTrigger>
          <TabsTrigger value="earnings" className="rounded-md font-mono text-xs capitalize text-white/50 data-[state=active]:bg-[#00ff88]/10 data-[state=active]:text-[#00ff88]">earnings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="flex-1 mt-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <s.icon className="h-4 w-4 mb-2 opacity-60" />
                <div className="text-lg font-bold tracking-tight">{s.value}</div>
                <div className="text-xs opacity-50">{s.label}</div>
              </motion.div>
            ))}
          </div>
          <LiveFeed />
          <NetworkMap />
        </TabsContent>

        <TabsContent value="chunks" className="flex-1 mt-6">
          <div className="grid grid-cols-8 gap-2">
            {CHUNKS.map((c) => (
              <div key={c.id} className={`h-6 rounded-sm transition-colors ${c.active ? "bg-[#00ff88]" : "bg-white/10"}`} />
            ))}
          </div>
          <p className="mt-4 font-mono text-xs text-white/40">{totalGB} GB total shared across network</p>
        </TabsContent>

        <TabsContent value="earnings" className="flex-1 mt-6">
          <EarningsChart />
        </TabsContent>
      </Tabs>
    </div>
  )
}
