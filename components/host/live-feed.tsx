"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const TEMPLATES = [
  "encrypted chunk stored for training run #{n}",
  "Shamir share {s}-of-3 replicated to node EU-{n}",
  "integrity check passed on shard 0x{h}",
  "spillover noise absorbed from vault #{n}",
  "read-only fetch served to guest {h} in {ms}ms",
  "self-heal repaired chunk on US-WEST-{n}",
]

function build(i: number) {
  const t = TEMPLATES[i % TEMPLATES.length]
  const gb = (Math.random() * 40 + 2).toFixed(0)
  return {
    id: i,
    gb,
    text: t
      .replace("{n}", String(Math.floor(Math.random() * 900) + 100))
      .replace("{s}", String(Math.floor(Math.random() * 3) + 1))
      .replace("{h}", Math.random().toString(16).slice(2, 8))
      .replace("{ms}", String(Math.floor(Math.random() * 40) + 8)),
  }
}

export function LiveFeed() {
  const [lines, setLines] = useState<ReturnType<typeof build>[]>([])
  const counter = useRef(0)

  useEffect(() => {
    setLines([0, 1, 2].map(() => build(counter.current++)))
    const id = setInterval(() => {
      setLines((prev) => [build(counter.current++), ...prev].slice(0, 5))
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="rounded-lg border border-white/10 bg-black/40 p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff88] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ff88]" />
        </span>
        <span className="font-mono text-[11px] tracking-widest text-white/50">LIVE ACTIVITY</span>
      </div>
      <div className="space-y-1.5 font-mono text-[12px] leading-relaxed">
        <AnimatePresence initial={false}>
          {lines.map((l) => (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-start gap-2 text-white/70"
            >
              <span className="text-[#00ff88]">{">"}</span>
              <span>
                <span className="text-[#00ff88]">{l.gb}GB</span> {l.text}
                <AnimatedDots />
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

function AnimatedDots() {
  const [n, setN] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setN((x) => (x + 1) % 4), 400)
    return () => clearInterval(id)
  }, [])
  return <span className="text-white/40">{".".repeat(n)}</span>
}
