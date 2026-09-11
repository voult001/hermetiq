"use client"

import { motion } from "framer-motion"
import { Wallet } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const DATA = [
  { m: "Jan", v: 8 },
  { m: "Feb", v: 14 },
  { m: "Mar", v: 19 },
  { m: "Apr", v: 27 },
  { m: "May", v: 34 },
  { m: "Jun", v: 41 },
  { m: "Jul", v: 52 },
  { m: "Aug", v: 63 },
  { m: "Sep", v: 78 },
  { m: "Oct", v: 94 },
  { m: "Nov", v: 112 },
  { m: "Dec", v: 148 },
]

export function EarningsChart() {
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono text-[11px] tracking-widest text-white/50">TOTAL EARNED</p>
          <p className="font-mono text-3xl font-bold text-[#00ff88]" style={{ textShadow: "0 0 24px #00ff8855" }}>
            $148.00
          </p>
        </div>
        <span className="font-mono text-xs text-[#00ff88]">+18.2% MoM</span>
      </div>

      <div className="h-56 w-full rounded-lg border border-white/10 bg-black/40 p-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={DATA} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="earn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00ff88" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#00ff88" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="m"
              tick={{ fill: "oklch(1 0 0 / 40%)", fontSize: 10, fontFamily: "monospace" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "oklch(1 0 0 / 40%)", fontSize: 10, fontFamily: "monospace" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "#0a0a0a",
                border: "1px solid #00ff8844",
                borderRadius: 8,
                fontFamily: "monospace",
                fontSize: 12,
              }}
              labelStyle={{ color: "#00ff88" }}
              itemStyle={{ color: "#fff" }}
              formatter={(v: number) => [`$${v}`, "Earned"]}
            />
            <Area
              type="monotone"
              dataKey="v"
              stroke="#00ff88"
              strokeWidth={2}
              fill="url(#earn)"
              animationDuration={1600}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        whileHover={{ boxShadow: "0 0 28px #00ff8844" }}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[#00ff88] bg-transparent font-mono text-sm font-bold tracking-wide text-[#00ff88] transition-colors hover:bg-[#00ff88]/10"
      >
        <Wallet className="h-4 w-4" aria-hidden="true" />
        Payout $148.00
      </motion.button>
    </div>
  )
}
