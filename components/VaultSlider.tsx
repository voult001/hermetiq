"use client"
import { useState, useMemo } from "react"

export function VaultSlider() {
  const [gb, setGb] = useState(500)

  const label = useMemo(() => {
    return gb >= 1000? `${(gb/1000).toFixed(1)} TB` : `${gb} GB`
  }, [gb])

  const price = useMemo(() => {
    return ((gb / 1000) * 8).toFixed(2)
  }, [gb])

  return (
    <div className="w-full max-w-[520px] rounded-[24px] border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-[11px] tracking-[0.2em] text-zinc-500 uppercase">Storage</p>
          <p className="mt-2 text-[40px] font-semibold leading-none tracking-tight text-white">{label}</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] tracking-[0.2em] text-zinc-500 uppercase">Est.</p>
          <p className="mt-2 text-xl font-medium text-white">${price}<span className="text-zinc-500 text-sm">/mo</span></p>
        </div>
      </div>

      <div className="relative">
        <div className="flex justify-between mb-3 font-mono text-[11px] text-zinc-500">
          <span>50 GB</span>
          <span>2 TB</span>
        </div>
        <input
          type="range"
          min={50}
          max={2000}
          step={50}
          value={gb}
          onChange={(e) => setGb(Number(e.target.value))}
          className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-white"
        />
      </div>

      <div className="mt-6 flex gap-2">
        {[50, 500, 1000, 2000].map(v => (
          <button
            key={v}
            onClick={() => setGb(v)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${gb===v? 'bg-white text-black' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
          >
            {v >= 1000? `${v/1000}TB` : `${v}GB`}
          </button>
        ))}
      </div>
    </div>
  )
}
