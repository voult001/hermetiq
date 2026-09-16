"use client"
import { useState } from "react"
import { Slider } from "@/components/ui/slider"

export function VaultSlider() {
  const [gb, setGb] = useState(500)

  return (
    <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="mb-4 flex justify-between">
        <span className="font-mono text-sm opacity-60">50 GB</span>
        <span className="font-mono text-sm opacity-60">2 TB</span>
      </div>
      <Slider
        min={50}
        max={2000}
        step={50}
        value={[gb]}
        onValueChange={(v) => setGb(v[0])}
      />
      <div className="mt-4 text-center">
        <div className="text-3xl font-bold">{gb >= 1000? (gb/1000).toFixed(1) + " TB" : gb + " GB"}</div>
        <div className="mt-1 text-xs opacity-50">Selected storage</div>
      </div>
    </div>
  )
}
