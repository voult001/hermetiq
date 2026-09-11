"use client"

import { motion } from "framer-motion"
import { HardDrive, Activity, Star, Handshake } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { LiveFeed } from "./live-feed"
import { NetworkMap } from "./network-map"
import { EarningsChart } from "./earnings-chart"

const STATS = [
  { icon: HardDrive, value: "0.5 TB", label: "Shared" },
  { icon: Activity, value: "99.2%", label: "Uptime" },
  { icon: Star, value: "5.0", label: "Rating" },
  { icon: Handshake, value: "3", label: "Active Deals" },
]

const CHUNKS = Array.from({ length: 48 }, (_, i) => ({
  id: i,
  active: Math.random() > 0.35,
}))

export function HostDashboard() {
  return (
    <div className="flex h-full flex-col border-l border-white/10 bg-white/[0.02] p-6">
      <Tabs defaultValue="overview" className="flex h-full flex-col">
        <TabsList className="w-full justify-start gap-1 bg-transparent p-0">
          {["overview", "chunks", "earnings"].map((t) => (
            <TabsTrigger
              key={t}
              value={t}
              className="rounded-md font-mono text-xs capitalize tracking-wide text-white/50 data-[state=active]:bg-[#00ff88]/10 data-[state=active]:text-[#00ff88]"
            >
              {t}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-5 space-y-4">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-lg border border-white/10 bg-black/40 p-3.5"
              >
                <s.icon className="h-4 w-4 text-[#00ff88]" aria-hidden="true" />
                <p className="mt-2 font-mono text-lg font-bold text-white">{s.value}</p>
                <p className="font-mono text-[10px] tracking-wider text-white/40">{s.label}</p>
              </motion.div>
            ))}
          </div>
          <LiveFeed />
          <NetworkMap />
        </TabsContent>

        <TabsContent value="chunks" className="mt-5 space-y-4">
          <div className="rounded-lg border border-white/10 bg-black/40 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-widest text-white/50">STORED CHUNKS</span>
              <span className="font-mono text-[11px] text-[#00ff88]">31 / 48 slots</span>
            </div>
            <div className="grid grid-cols-12 gap-1.5">
              {CHUNKS.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.015 }}
                  className={`aspect-square rounded-sm ${
                    c.active ? "bg-[#00ff88]" : "bg-white/10"
                  }`}
                  style={c.active ? { boxShadow: "0 0 6px #00ff8866" } : undefined}
                  title={c.active ? "Encrypted chunk" : "Empty slot"}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { v: "31", l: "Chunks stored" },
              { v: "AES-256", l: "Per-chunk cipher" },
              { v: "2-of-3", l: "Shamir shares" },
            ].map((s) => (
              <div key={s.l} className="rounded-lg border border-white/10 bg-black/40 p-3.5">
                <p className="font-mono text-base font-bold text-[#00ff88]">{s.v}</p>
                <p className="mt-1 font-mono text-[10px] tracking-wider text-white/40">{s.l}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="earnings" className="mt-5">
          <EarningsChart />
        </TabsContent>
      </Tabs>
    </div>
  )
}
