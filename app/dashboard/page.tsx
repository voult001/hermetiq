"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function StorePage() {
  const [size, setSize] = useState("50GB")
  const [uploading, setUploading] = useState(false)

  const prices: any = { "50GB": "$0.40/mo", "500GB": "$2.50/mo", "1TB": "$5.00/mo", "2TB": "$9.00/mo" }

  const handleUpload = async (fileList: FileList | null) => {
    if (!fileList) return
    setUploading(true)
    // TU MOTOR REAL: cut + encrypt + 5 shards + supabase
    console.log("Uploading", fileList[0].name, "plan", size)
    setTimeout(() => setUploading(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <nav className="h-[64px] flex items-center justify-between px-6 border-b border-[#1A1A1A] bg-black">
        <div className="font-black text-[#00FF88] tracking-widest">SIGILLUQ</div>
        <div className="flex gap-3 items-center">
          <span className="text-xs text-zinc-400">info@sigilluq.com</span>
          <button className="bg-[#1A1A1A] px-4 py-2 rounded-full text-xs">Sign Out</button>
          <button className="bg-[#00FF88] text-black px-4 py-2 rounded-full text-xs font-bold">Vault</button>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-64px)]">
        {/* LEFT 50% - PRECIO */}
        <div className="p-10 lg:p-16 bg-[#0A0A0A] border-r border-[#1A1A1A] flex flex-col justify-center">
          <h1 className="text-[42px] font-bold leading-tight">Store Files - Encrypted <span className="text-[#00FF88]">$0.005/GB</span></h1>
          <p className="text-zinc-400 text-sm mt-3">Military-grade encryption. Distributed across 625TB network. Pay only for what you use.</p>

          <div className="mt-10 bg-[#141414] border border-zinc-800 rounded-2xl p-6">
            <div className="flex justify-between">
              <div><p className="text-[11px] tracking-widest text-zinc-500">STORAGE</p><p className="text-3xl font-bold mt-1">{size}</p></div>
              <div className="text-right"><p className="text-[11px] tracking-widest text-zinc-500">EST.</p><p className="font-bold">{prices[size]}</p></div>
            </div>
            <div className="flex gap-2 mt-6">
              {["50GB","500GB","1TB","2TB"].map(s=>(
                <button key={s} onClick={()=>setSize(s)} className={`px-4 py-2 rounded-full text-xs font-bold border ${size===s? 'bg-white text-black border-white' : 'bg-[#1A1A1A] border-zinc-800 text-zinc-400'}`}>{s}</button>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-zinc-800">
              <p className="text-[11px] text-zinc-500">U.S. Pat. App. No. 64/153,968 - Patent Pending</p>
            </div>
          </div>
        </div>

        {/* RIGHT 50% - EL DE PUNTICOS QUE TE GUSTA - 100% IGUAL AL DASHBOARD */}
        <div className="p-10 lg:p-16 bg-[#111111] flex flex-col justify-center items-center">
          <h2 className="text-[28px] font-bold self-start">Storage & Upload</h2>
          <p className="text-zinc-400 text-sm self-start mt-1 mb-8">Cloud storage management • 10TB plan</p>

          <div className="relative w-[180px] h-[180px] mb-8">
            <div className="absolute inset-0 rounded-full border-[12px] border-zinc-800"></div>
            <div className="absolute inset-0 rounded-full border-[12px] border-[#00FF88] border-r-transparent border-b-transparent rotate-45"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[42px] font-bold text-[#00FF88]">62%</span>
              <span className="text-[11px] text-zinc-400">6.2TB / 10TB used</span>
            </div>
          </div>

          <label className="w-full border-2 border-dashed border-[#00FF88]/40 rounded-2xl p-10 text-center cursor-pointer hover:border-[#00FF88]/60 bg-[#0A0A0A]/50 transition">
            <div className="text-2xl mb-2">☁️</div>
            <p className="font-bold text-sm">Drag & drop files here</p>
            <p className="text-[11px] text-zinc-500 mt-2">or click to browse • Supports PDF, XLSX, CSV, DOCX, TXT • Max 500MB per file</p>
            <input type="file" className="hidden" onChange={(e)=>handleUpload(e.target.files)} multiple />
          </label>

          <button onClick={()=>document.querySelector<HTMLInputElement>('input[type=file]')?.click()} disabled={uploading} className="w-full mt-4 bg-[#00FF88] text-black font-bold py-4 rounded-xl hover:bg-[#00FF88]/90 text-sm">
            {uploading? 'Encrypting into 5 shards...' : '↑ Upload Files'}
          </button>
          <p className="text-[10px] text-zinc-500 mt-3">Files are encrypted end-to-end • 🛡️ Retention: 90 days</p>
        </div>
      </div>

      <div className="h-[60px] border-t border-zinc-800 bg-black flex items-center justify-between px-6 text-[11px] text-zinc-500">
        <span>🛡️ SIGILLUQ 616TB • Encrypted</span>
        <span className="border border-white rounded-full px-3 py-1">U.S. Pat. App. No. 64/153,968 - Patent Pending</span>
        <span>© 2026 SIGILLUQ - All Rights Reserved</span>
      </div>
    </div>
  )
}
