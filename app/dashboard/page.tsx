"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [files, setFiles] = useState<any[]>([
    { name: "Contract_2024.pdf", type: "PDF", size: "1.2MB", icon: "PDF", color: "bg-red-500" },
    { name: "Financial_Q1.xlsx", type: "XLSX", size: "842KB", icon: "X", color: "bg-green-600" },
    { name: "Customer_Data.csv", type: "CSV", size: "340KB", icon: "CSV", color: "bg-blue-500" },
    { name: "Design_Specs.docx", type: "DOCX", size: "518KB", icon: "DOCX", color: "bg-blue-700" },
    { name: "Onboarding_Notes.txt", type: "TXT", size: "12KB", icon: "TXT", color: "bg-zinc-500" },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser()
      if (!data.user) { router.replace("/signin"); return }
      setUser(data.user)
      const { data: dbFiles } = await supabase.from('files').select('*')
      if (dbFiles && dbFiles.length > 0) {
        setFiles(dbFiles.map((f:any)=>({ name: f.file_name||f.name, type: f.type||"PDF", size: f.size||"—", icon: "PDF", color:"bg-red-500" })))
      }
      setLoading(false)
    }
    load()
  }, [router])

  if (loading) return <div className="min-h-screen bg-[#0A0A0A] text-white p-10">Loading SIGILLUQ...</div>

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* TOP NAV - EXACTO A LA FOTO */}
      <nav className="h-[56px] flex items-center justify-between px-6 border-b border-white/[0.08] bg-[#0F0F0F]">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 font-black text-[18px]"><span className="text-[#00FF88]">🛡️</span> SIGILLUQ</div>
          <div className="hidden md:flex items-center gap-6 text-[12px] text-zinc-500">
            <span className="flex items-center gap-1">◧ Dashboard</span>
            <span className="text-white border-b-2 border-[#00FF88] pb-1">Vault</span>
            <span>⬢ Storage</span>
            <span>👥 Team</span>
            <span>⚙ Settings</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-zinc-600">🔔</span>
          <div className="w-7 h-7 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-[10px]">JD</div>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] min-h-[calc(100vh-56px)]">
        {/* LEFT - MY VAULT - EXACTO A FOTO */}
        <div className="p-6 lg:p-8 border-r border-white/[0.08] bg-[#0F0F0F]">
          <h1 className="text-[26px] font-bold leading-none">My Vault</h1>
          <p className="text-[12px] text-zinc-500 mt-2">Your secure files • 24 items • 2.1GB total</p>

          <div className="mt-5 flex items-center gap-2">
            <div className="flex-1 h-[36px] rounded-lg bg-[#1A1A1A] border border-white/[0.08] flex items-center px-3 gap-2">
              <span className="text-zinc-500 text-[13px]">⌕</span>
              <input placeholder="Search files, folders, tags..." className="bg-transparent outline-none text-[12px] flex-1 placeholder:text-zinc-600" />
              <button className="text-[10px] px-2 py-1 rounded bg-white/[0.06] border border-white/[0.08]">≣ Filters</button>
            </div>
          </div>

          <div className="mt-4 rounded-lg overflow-hidden border border-white/[0.08] bg-[#1E1E1E]">
            <div className="grid grid-cols-12 px-4 py-2.5 text-[10px] font-bold tracking-widest text-zinc-500 bg-[#2A2A2A] border-b border-white/[0.08]">
              <div className="col-span-6">NAME</div><div className="col-span-2">TYPE</div><div className="col-span-2">SIZE</div><div className="col-span-2">STATUS</div>
            </div>
            {files.map((f:any, i:number)=>(
              <div key={i} className="grid grid-cols-12 px-4 py-3 text-[12px] border-b border-white/[0.05] hover:bg-white/[0.04] items-center">
                <div className="col-span-6 flex items-center gap-2 truncate">
                  <div className={`w-6 h-6 rounded ${f.color} flex items-center justify-center text-[8px] font-black text-white`}>{f.icon}</div>
                  <span className="font-medium">{f.name}</span>
                </div>
                <div className="col-span-2 text-zinc-400 text-[11px]">{f.type}</div>
                <div className="col-span-2 text-zinc-400 text-[11px]">{f.size}</div>
                <div className="col-span-2"><span className="px-2 py-1 rounded-full bg-[#00FF88]/20 text-[#00FF88] text-[9px] font-bold border border-[#00FF88]/20">● Secure</span></div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-[11px] text-zinc-600">Showing 5 of 24 files<br/><span className="tracking-widest">&lt; 1 2 3 &gt;</span></div>
        </div>

        {/* RIGHT - STORAGE & UPLOAD - EXACTO A FOTO */}
        <div className="p-6 lg:p-8 bg-[#121212] flex flex-col">
          <div className="text-center">
            <h2 className="text-[20px] font-bold">Storage & Upload</h2>
            <p className="text-[11px] text-zinc-500 mt-1">Cloud storage management • 10TB plan</p>
          </div>

          <div className="flex flex-col items-center mt-8">
            <div className="relative w-[150px] h-[150px]">
              <div className="absolute inset-0 rounded-full border-[10px] border-[#1E1E1E]"></div>
              <div className="absolute inset-0 rounded-full border-[10px] border-[#00FF88] border-l-transparent border-b-transparent rotate-45" style={{borderTopColor:"#00FF88", borderRightColor:"#00FF88"}}></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[28px] font-[800] text-[#00FF88]">62%</span>
                <span className="text-[9px] text-zinc-400">6.2TB / 10TB used</span>
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 mt-4">↗ 1.8TB available • Upgrade plan</p>
          </div>

          <label className="mt-8 w-full rounded-xl border border-dashed border-[#00FF88]/30 bg-[#0A0A0A] p-6 text-center cursor-pointer hover:border-[#00FF88]/60 transition">
            <div className="text-[#00FF88] text-xl">☁️</div>
            <p className="font-bold text-[13px] mt-2">Drag & drop files here</p>
            <p className="text-[10px] text-zinc-500 mt-2 leading-relaxed">or click to browse • Supports PDF, XLSX, CSV, DOCX, TXT<br/>• Max 500MB per file</p>
            <input type="file" className="hidden" multiple />
          </label>

          <button className="w-full mt-3 h-[40px] rounded-lg bg-[#00FF88] text-black font-bold text-[13px] flex items-center justify-center gap-1">⇧ Upload Files</button>
          <p className="text-[10px] text-zinc-600 mt-3 text-center">Files are encrypted end-to-end • 🛡️ Retention: 90 days</p>
        </div>
      </div>
    </div>
  )
}
