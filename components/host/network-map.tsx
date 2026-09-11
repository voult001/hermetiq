"use client"

import { motion } from "framer-motion"

const NODES = [
  { x: 18, y: 32 },
  { x: 30, y: 55 },
  { x: 46, y: 28 },
  { x: 52, y: 62 },
  { x: 68, y: 40 },
  { x: 80, y: 30 },
  { x: 84, y: 66 },
  { x: 62, y: 22 },
]

const LINKS: [number, number][] = [
  [0, 2],
  [2, 4],
  [4, 5],
  [5, 6],
  [1, 3],
  [3, 4],
  [2, 7],
  [7, 5],
  [1, 0],
]

export function NetworkMap() {
  return (
    <div className="rounded-lg border border-white/10 bg-black/40 p-4">
      <div className="mb-3 font-mono text-[11px] tracking-widest text-white/50">GLOBAL NODE NETWORK</div>
      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-md">
        <svg viewBox="0 0 100 75" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="dots" width="4" height="4" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.4" fill="oklch(1 0 0 / 8%)" />
            </pattern>
          </defs>
          <rect width="100" height="75" fill="url(#dots)" />

          {LINKS.map(([a, b], i) => (
            <g key={i}>
              <line
                x1={NODES[a].x}
                y1={NODES[a].y}
                x2={NODES[b].x}
                y2={NODES[b].y}
                stroke="#00ff88"
                strokeOpacity={0.2}
                strokeWidth={0.4}
              />
              <motion.circle
                r={0.9}
                fill="#00ff88"
                initial={{ offsetDistance: "0%" }}
                animate={{
                  cx: [NODES[a].x, NODES[b].x],
                  cy: [NODES[a].y, NODES[b].y],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
                style={{ filter: "drop-shadow(0 0 2px #00ff88)" }}
              />
            </g>
          ))}

          {NODES.map((n, i) => (
            <g key={i}>
              <motion.circle
                cx={n.x}
                cy={n.y}
                r={1.6}
                fill="#00ff88"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.25 }}
                style={{ filter: "drop-shadow(0 0 3px #00ff88)" }}
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}
