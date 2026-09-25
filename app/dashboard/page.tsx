// app/dashboard/page.tsx
"use client"
import { useState } from "react"

export default function DashboardPage() {
  const [plan, setPlan] = useState("100GB")

  return (
    <div className="min-h-screen bg-[#0B0B0F] p-4 text-white">
      {/* HEADER - SIGILLUQ VAULT */}
      <div className="max-w-[1250px] mx-auto bg-[#1A1A1E] border border-white/10 rounded-xl px-4 py-3 flex justify-between items-center mb-4">
        <div className="flex items-center gap-5">
          <button className="text-white/50 text-[13px]">← Go Back</button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#00FF88]/15 border border-[#00FF88]/20 rounded-lg flex items-center justify-center">🛡️</div>
            <h1 className="font-black tracking-widest text-[15px]"><span className="text-[#00FF88]">SIGILLUQ</span> <span className="text-white ml-1">VAULT</span></h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#00FF88]/20 rounded-full flex items-center justify-center text-[#00FF88] text-xs">JS</div>
          <span className="text-xs text-white/60">john.smith@company</span>
          <button className="text-[11px] border border-white/15 px-4 py-1.5 rounded-full text-white/50">Log Out</button>
        </div>
      </div>

      <div className="max-w-[1250px] mx-auto grid grid-cols-[320px_1fr] gap-4">
        {/* LEFT - My Vault */}
        <div className="bg-[#16161A] border border-white/10 rounded-xl p-4">
          <h2 className="font-bold mb-4">📁 My Vault</h2>
          {/*... tus files... */}
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <div className="bg-[#16161A] border border-white/10 rounded-xl p-5">
            <h2 className="font-bold">💾 Storage Usage 62%</h2>
            <div className="mt-4 border border-dashed border-[#00FF88]/60 rounded-lg py-4 text-center">
              <p className="text-[#00FF88] font-bold text-sm">⬇ Drag & drop files here</p>
            </div>
          </div>

          <div className="bg-[#16161A] border border-white/10 rounded-xl p-5">
            <h2 className="font-bold">Upgrade Storage Package</h2>
            {/*... tus packages con radios... */}
          </div>

          {/* FOOTER PATENTE */}
          <div className="flex justify-between text-[10px] text-white/30">
            <span>SIGILLUQ 616TB - Encrypted</span>
            <span className="border border-white/15 px-3 py-1 rounded-full">U.S. Pat. App. No. 64/153,968 - Patent Pending</span>
            <span>© 2026 SIGILLUQ - All Rights Reserved</span>
          </div>
        </div>
      </div>
    </div>
  )
}
