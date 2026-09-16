"use client"
import { useState } from "react"

export function VaultSlider() {
  const [gb, setGb] = useState(500)

  const label = gb >= 1000 ? (gb/1000).toFixed(1) + " TB" : gb + " GB"

  return (
    <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="mb-4 flex justify-between font-mono text-sm opacity-60">
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
        className="w-full"
      />
      <div className="mt-4 text-center">
        <div className="text-3xl font-bold">{label}</div>
        <div className="mt-1 text-xs opacity-50">Selected storage</div>
      </div>
    </div>
  )
}
