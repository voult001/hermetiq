"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Lock, Square, Eye } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { CircularProgress } from "./circular-progress"

const RATE_PER_GB_MO = 0.0248

export function HostPanel() {
  const [share, setShare] = useState(500)
  const [earning, setEarning] = useState(false)

  const monthly = share * RATE_PER_GB_MO
  const yearly = monthly * 12

  return (
    <div className="flex flex-col gap-7 p-8">
      <div>
        <h1 className="text-balance text-2xl font-bold leading-tight tracking-tight text-white md:text-[28px]">
          Rent your spare drive.{" "}
          <span className="text-[#00ff88]" style={{ textShadow: "0 0 24px #00ff8855" }}>
            Earn $500/TB/year.
          </span>
        </h1>
      </div>

      <CircularProgress used={70} freeLabel="847.3 GB" />

      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-xs tracking-wider text-white/60">SHARE</span>
          <span className="font-mono text-lg font-bold text-white">
            {share >= 1000 ? `${(share / 1000).toFixed(1)}TB` : `${share}GB`}
          </span>
        </div>
        <Slider
          value={[share]}
          onValueChange={(v) => setShare(v[0])}
          min={50}
          max={1000}
          step={10}
          aria-label="Amount of storage to share"
        />
      </div>

      <div className="rounded-lg border border-[#00ff88]/40 bg-[#00ff88]/[0.06] px-4 py-3.5">
        <p className="font-mono text-sm text-white">
          Estimated:{" "}
          <span className="font-bold text-[#00ff88]">${monthly.toFixed(2)}/mo</span>
          <span className="mx-1.5 text-white/30">|</span>
          <span className="font-bold text-[#00ff88]">${yearly.toFixed(0)}/yr</span>
        </p>
        <p className="mt-1 font-mono text-[11px] tracking-wide text-white/40">at $0.015/GB</p>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        whileHover={{ boxShadow: "0 0 32px #00ff8855" }}
        onClick={() => setEarning((e) => !e)}
        className="flex h-13 items-center justify-center gap-2 rounded-lg bg-[#00ff88] font-mono text-sm font-bold tracking-wide text-black transition-colors hover:bg-[#00ff88]/90"
      >
        {earning ? (
          <>
            <Square className="h-4 w-4 fill-black" aria-hidden="true" />
            Earning Active — Stop
          </>
        ) : (
          <>
            <Play className="h-4 w-4 fill-black" aria-hidden="true" />
            Start Earning
          </>
        )}
      </motion.button>

      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-wide text-white/40">
        <span className="inline-flex items-center gap-1.5">
          <Lock className="h-3 w-3" aria-hidden="true" /> AES-256 Encrypted
        </span>
        <span className="text-white/20">•</span>
        <span className="inline-flex items-center gap-1.5">
          <Square className="h-3 w-3" aria-hidden="true" /> Stop anytime
        </span>
        <span className="text-white/20">•</span>
        <span className="inline-flex items-center gap-1.5">
          <Eye className="h-3 w-3" aria-hidden="true" /> Read-only
        </span>
      </div>
    </div>
  )
}
