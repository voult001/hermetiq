"use client"

import { motion } from "framer-motion"

export function CircularProgress({
  used = 70,
  freeLabel = "847.3 GB",
}: {
  used?: number
  freeLabel?: string
}) {
  const size = 200
  const stroke = 12
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (used / 100) * circumference

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="oklch(1 0 0 / 8%)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#00ff88"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          style={{ filter: "drop-shadow(0 0 8px #00ff8888)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-2xl font-bold text-[#00ff88]" style={{ textShadow: "0 0 20px #00ff8855" }}>
          {freeLabel}
        </span>
        <span className="mt-1 font-mono text-xs tracking-wider text-white/50">FREE</span>
        <span className="mt-2 font-mono text-[10px] tracking-wider text-white/40">{used}% USED</span>
      </div>
    </div>
  )
}
