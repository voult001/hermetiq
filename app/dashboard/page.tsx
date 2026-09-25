"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [files, setFiles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser()
      if (!data.user) { router.replace("/signin"); return }
      setUser(data.user)
      const { data: f } = await supabase.from('files').select('*')
      if (f) setFiles(f)
      setLoading(false)
    }
    checkUser()
  }, [router])

  if (loading) return <div className="min-h-screen bg-[#050505] text-white p-10">Loading SIGILLUQ...</div>

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00FF88]/30">
      {/* NAV PRO */}
      <nav className="h-[72px] flex items-center justify-between px-8 border-b border-white/[0.06] bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00FF88] flex items-center justify-center font-black text-black">S</div>
          <span className="font-bold tracking-[0.2em] text-[13px]">SIGILLUQ</span>
          <span className="text-[10px] text-zinc-500 border border-white/10 rounded-full px-2 py-0.5 ml-3">616TB Encrypted</span>
        </div>
        <div className="flex items-center gap-4 text-[12px]">
          <span className="text-zinc-500">{user?.email}</span>
          <div className="w-7 h-7 rounded-full bg-zinc-800"></div>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] min-h-[calc(100vh-72px)]">
        {/* LEFT - VAULT - BILLION DOLLAR */}
        <div className="p-10 lg:p-14 border-r border-white/[0.06] bg-[radial-gradient(ellipse_at_top,_rgba(0,255,136,0.08),_transparent_60%)]">
          <div className="max-w-[640px]">
            <h1 className="text-[44px] font-[800] tracking-tight leading-[0.95]">Store Files - Encrypted <span className="text-[#00FF88]">$0.005/GB</span></h1>
            <p className="text-zinc-400 text-[14px] mt-4 leading-relaxed">Military-grade encryption. Distributed across 625TB network. Pay only for what you use. Your files are sharded into 5 encrypted pieces.</p>

            <div className="mt-10 rounded-[24px] bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl p-7 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-zinc-500 font-bold">STORAGE</p>
                  <p className="text-[32px] font-bold mt-1">50GB</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] tracking-[0.2em] text-zinc-500 font-bold">EST.</p>
                  <p className="text-[14px] font-semibold mt-1 text-zinc-300">$0.40/mo</p>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                {["50GB","500GB","1TB","2TB"].map(s=>(
                  <button key={s} className={`px-4 py-2 rounded-full text-[11px] font-bold transition ${s==="50GB"? 'bg-white text-black' : 'bg-white/[0.06] border border-white/[0.08] text-zinc-400 hover:bg-white/[0.1]'}`}>{s}</button>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/[0.06] flex justify-between text-[10px] text-zinc-500">
                <span>U.S. Pat. App. No. 64/153,968 - Patent Pending</span>
                <span>{files.length} files secured</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT - UPLOAD - BILLION DOLLAR */}
        <div className="p-10 lg:p-14 bg-[#0A0A0A] flex flex-col">
          <div>
            <h2 className="text-[22px] font-bold tracking-tight">Storage & Upload</h2>
            <p className="text-[12px] text-zinc-500 mt-1">Cloud storage management • 10TB plan • End-to-end encrypted</p>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center py-12">
            {/* CIRCLE PRO - conic gradient */}
            <div className="relative w-[200px] h-[200px]">
              <div className="absolute inset-0 rounded-full" style={{background: `conic-gradient(#00FF88 62%, #1A1A1A 0)`}}></div>
              <div className="absolute inset-[14px] rounded-full bg-[#0A0A0A]"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[48px] font-[800] tracking-tighter">62%</span>
                <span className="text-[11px] text-zinc-500 font-medium">6.2TB / 10TB used</span>
                <span className="mt-2 text-[10px] px-2 py-1 rounded-full bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/20">● Live</span>
              </div>
            </div>

            {/* DRAG & DROP BILLION-DOLLAR */}
            <label className="mt-12 w-full group relative rounded-[20px] border border-dashed border-white/15 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#00FF88]/50 p-10 text-center cursor-pointer transition-all duration-300">
              <div className="absolute inset-0 rounded-[20px] bg-gradient-to-b from-[#00FF88]/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition"></div>
              <div className="relative">
                <div className="w-10 h-10 mx-auto rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-4">☁️</div>
                <p className="font-semibold text-[14px]">Drag & drop files here</p>
                <p className="text-[11px] text-zinc-500 mt-2">or click to browse • PDF, XLSX, CSV, DOCX, TXT • Max 500MB per file</p>
              </div>
              <input type="file" className="hidden" multiple />
            </label>

            <button className="w-full mt-4 h-[52px] rounded-[14px] bg-[#00FF88] text-black font-bold text-[14px] tracking-wide hover:bg-[#00FF88]/90 transition shadow-[0_0_30px_rgba(0,255,136,0.3)]">
              ↑ Upload Files
            </button>
            <p className="text-[10px] text-zinc-600 mt-4">Files are encrypted end-to-end • 🛡️ Retention: 90 days • Sharded x5</p>
          </div>
        </div>
      </div>
    </div>
  )
}
