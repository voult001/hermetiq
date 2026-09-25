"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  const files = [
    { name: "Contract_2024.pdf", type: "PDF", size: "1.2MB", icon: "PDF", color: "bg-red-500" },
    { name: "Financial_Q1.xlsx", type: "XLSX", size: "842KB", icon: "X", color: "bg-green-600" },
    { name: "Customer_Data.csv", type: "CSV", size: "340KB", icon: "CSV", color: "bg-blue-500" },
    { name: "Design_Specs.docx", type: "DOCX", size: "518KB", icon: "DOCX", color: "bg-blue-700" },
    { name: "Onboarding_Notes.txt", type: "TXT", size: "12KB", icon: "TXT", color: "bg-zinc-500" },
  ]

  useEffect(() => { supabase.auth.getUser().then(({data})=>{ if(!data.user) router.replace("/signin"); else setUser(data.user) }) }, [router])

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col">
      <nav className="h-[56px] flex items-center justify-between px-6 border-b border-white/[0.08] bg-[#0F0F0F] shrink-0">
        <div className="flex items-center gap-8">
          <div className="font-black">🛡️ SIGILLUQ</div>
          <div className="flex gap-6 text-[12px] text-zinc-500">
            <button onClick={()=>router.push('/')} className="hover:text-white">Dashboard</button>
            <button className="text-white border-b-2 border-[#00FF88]">Vault</button>
            <button onClick={()=>router.push('/storage')} className="hover:text-white">Storage</button>
            <button onClick={()=>router.push('/team')} className="hover:text-white">Team</button>
            <button onClick={()=>router.push('/settings')} className="hover:text-white">Settings</button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={()=>alert('Notifications - soon')} className="hover:text-white">🔔</button>
          <button onClick={()=>alert('Profile')} className="w-7 h-7 rounded-full bg-[#1A1A1A] text-[10px]">JD</button>
        </div>
      </nav>

      {/* GRID 50/50 CON MISMO ALTO - FIX DESCUADRADO */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-stretch">
        {/* LEFT - va hasta abajo aunque tenga pocos */}
        <div className="border-r border-white/[0.08] bg-[#0F0F0F] p-8 flex flex-col min-h-[calc(100vh-56px)]">
          <h1 className="text-[26px] font-bold">My Vault</h1>
          <p className="text-[12px] text-zinc-500 mt-1">Your secure files • 24 items • 2.1GB total</p>

          <div className="mt-4 h-[36px] rounded-lg bg-[#1A1A1A] border border-white/[0.08] flex items-center px-3 text-[12px] text-zinc-500">⌕ Search files, folders, tags... <span className="ml-auto text-[10px] border px-2 py-0.5 rounded">Filters</span></div>

          {/* ESTE BOX AHORA LLEGA HASTA ABAJO */}
          <div className="mt-4 flex-1 rounded-lg border border-white/[0.08] bg-[#1E1E1E] flex flex-col">
            <div className="grid grid-cols-12 px-4 py-2.5 text-[10px] font-bold text-zinc-500 bg-[#2A2A2A]"><div className="col-span-6">NAME</div><div className="col-span-2">TYPE</div><div className="col-span-2">SIZE</div><div className="col-span-2">STATUS</div></div>
            <div className="flex-1">
              {files.map((f,i)=><div key={i} className="grid grid-cols-12 px-4 py-3 text-[12px] border-b border-white/[0.05]"><div className="col-span-6 flex gap-2 items-center"><div className={`w-5 h-5 rounded ${f.color} text-[7px] flex items-center justify-center font-bold`}>{f.icon}</div>{f.name}</div><div className="col-span-2 text-zinc-400 text-[11px]">{f.type}</div><div className="col-span-2 text-zinc-400 text-[11px]">{f.size}</div><div className="col-span-2"><span className="px-2 py-1 rounded-full bg-[#00FF88]/20 text-[#00FF88] text-[9px]">● Secure</span></div></div>)}
              {/* RELLENO PARA QUE LLEGUE ABAJO - SE VA LLENANDO POCO A POCO */}
              <div className="flex-1 min-h-[300px]"></div>
            </div>
            <div className="p-3 text-[11px] text-zinc-600 border-t border-white/[0.08]">Showing 5 of 24 files</div>
          </div>
        </div>

        {/* RIGHT - MISMO ALTO */}
        <div className="bg-[#121212] p-8 flex flex-col min-h-[calc(100vh-56px)]">
          <h2 className="text-[20px] font-bold text-center">Storage & Upload</h2>
          <p className="text-[11px] text-zinc-500 text-center">Cloud storage management • 10TB plan</p>

          <div className="flex flex-col items-center mt-8">
            <div className="relative w-[150px] h-[150px]"><div className="absolute inset-0 rounded-full border-[10px] border-[#1E1E1E]"></div><div className="absolute inset-0 rounded-full border-[10px] border-[#00FF88] border-l-transparent rotate-45"></div><div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-[28px] font-bold text-[#00FF88]">62%</span><span className="text-[9px] text-zinc-400">6.2TB / 10TB used</span></div></div>
            <p className="text-[11px] text-zinc-500 mt-4">↗ 1.8TB available • Upgrade plan</p>
          </div>

          <div className="mt-8 rounded-xl border border-dashed border-[#00FF88]/30 p-6 text-center bg-[#0A0A0A]">
            <p className="font-bold text-[13px]">Drag & drop files here</p>
            <p className="text-[10px] text-zinc-500 mt-1">Supports PDF, XLSX, CSV, DOCX, TXT • Max 500MB</p>
          </div>
          <button className="w-full mt-3 h-[40px] rounded-lg bg-[#00FF88] text-black font-bold text-[13px]">⇧ Upload Files</button>
          <div className="flex-1"></div>
          <p className="text-[10px] text-zinc-600 text-center mt-4">Files are encrypted end-to-end • Retention: 90 days</p>
        </div>
      </div>
    </div>
  )
}
