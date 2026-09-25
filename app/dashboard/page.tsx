"use client"
import { useState } from "react"

type FileItem = { name: string; detail: string; icon: string }

export default function DashboardPage() {
  const [plan, setPlan] = useState("100GB")
  const [hasStorage, setHasStorage] = useState(false)
  const [paid, setPaid] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [files, setFiles] = useState<FileItem[]>([
    { name: "Contracts", detail: "12 items • 3.2 GB", icon: "📁" },
    { name: "Q4_Financial_Report.pdf", detail: "24.8 MB • 2 days ago", icon: "📄" },
    { name: "Product_Assets", detail: "87 items • 1.1 GB", icon: "🖼️" },
    { name: "Investor_Deck_v3.pptx", detail: "8.3 MB • 1 week ago", icon: "📄" },
    { name: "API_Documentation.md", detail: "156 KB • 2 weeks ago", icon: "📄" },
    { name: "Backups_2024.zip", detail: "512 MB • 1 month ago", icon: "📦" },
  ])

  const handleUpload = (list: FileList) => {
    if (!paid) {
      alert("🔒 Select a package first - como me pediste jefe")
      return
    }
    const newFiles = Array.from(list).map(f => ({
      name: f.name,
      detail: `${(f.size/1024/1024).toFixed(1)} MB • Just now`,
      icon: "📄"
    }))
    setFiles([...newFiles,...files])
  }

  const small = [
    { id: "100GB", price: "$9 /mo" },
    { id: "500GB", price: "$29 /mo" },
    { id: "1TB", price: "$49 /mo" },
    { id: "2TB", price: "$79 /mo" },
    { id: "5TB", price: "$149 /mo" },
  ]
  const big = [
    { id: "10TB", price: "$249 /mo" },
    { id: "100TB", price: "$1,999 /mo" },
    { id: "500TB", price: "$7,500 /mo" },
    { id: "1PB+", price: "Custom Pricing" },
  ]

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white p-3">
      {/* HEADER - SIGILLUQ VAULT */}
      <div className="max-w-[1300px] mx-auto bg-[#1A1A1E] border border-white/10 rounded-xl px-4 py-3 flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <button className="text-white/50 text-[13px]">← Go Back</button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#00FF88]/15 border border-[#00FF88]/20 rounded-lg flex items-center justify-center">🛡️</div>
            <h1 className="font-black tracking-widest text-[14px]"><span className="text-[#00FF88]">SIGILLUQ</span> <span className="ml-2">VAULT</span></h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-[#00FF88]/20 rounded-full flex items-center justify-center text-[10px] text-[#00FF88] font-bold">JS</div>
          <span className="text-xs text-white/60">john.smith@company</span>
          <button className="text-[11px] border border-white/10 px-4 py-1.5 rounded-full text-white/60">Log Out</button>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto grid grid-cols-[320px_1fr] gap-4">
        {/* LEFT - My Vault */}
        <div className="bg-[#16161A] border border-white/10 rounded-xl p-4 h-fit">
          <div className="flex justify-between mb-4">
            <h2 className="font-bold">📁 My Vault</h2>
            <button onClick={()=>document.getElementById('fileInput')?.click()} className="text-[#00FF88] text-xs">+ New</button>
          </div>
          <div className="space-y-2">
            {files.map((f,i)=>(
              <div key={i} className="bg-[#1F1F23] p-2.5 rounded-lg flex gap-2">
                <span>{f.icon}</span>
                <div className="leading-tight"><p className="text-[13px] truncate">{f.name}</p><p className="text-[11px] text-white/30">{f.detail}</p></div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-[#00FF88] mt-6">● Synced • All files secure</p>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <div className="bg-[#16161A] border border-white/10 rounded-xl p-5">
            <div className="flex justify-between items-center">
              <h2 className="font-bold">💾 Storage Usage 62%</h2>
              <span className="text-[10px] border border-[#00FF88]/30 text-[#00FF88] px-3 py-1 rounded-full bg-[#00FF88]/10">Pro Plan • Active</span>
            </div>

            {/* DRAG AREA - MAS GRANDE Y CON CANDADO */}
            {!paid? (
              <div className="mt-4 border-2 border-dashed border-[#FFB020]/40 rounded-xl py-12 text-center bg-[#FFB020]/5">
                <p className="font-black text-[#FFB020]">🔒 Select Package First</p>
                <p className="text-white/40 text-xs mt-1">Uploads are disabled until you select a storage package</p>
              </div>
            ) : (
              <div
                onDragOver={e=>{e.preventDefault(); setDragOver(true)}}
                onDragLeave={()=>setDragOver(false)}
                onDrop={e=>{e.preventDefault(); setDragOver(false); handleUpload(e.dataTransfer.files)}}
                className={`mt-4 border-2 border-dashed rounded-xl py-12 text-center transition-all ${dragOver? 'border-[#00FF88] bg-[#00FF88]/10' : 'border-[#00FF88]/50 bg-[#00FF88]/[0.03]'}`}
              >
                <p className="text-[#00FF88] font-bold">⬇ Drag & drop files here to upload</p>
                <p className="text-white/40 text-[11px] mt-1">or click to browse • Max 10GB per file • Encrypted</p>
                <button onClick={()=>document.getElementById('fileInput')?.click()} className="mt-2 text-[#00FF88] text-xs underline">Browse Files</button>
                <input id="fileInput" type="file" multiple hidden onChange={e=> e.target.files && handleUpload(e.target.files)} />
              </div>
            )}
          </div>

          <div className="bg-[#16161A] border border-white/10 rounded-xl p-5">
            <h2 className="font-bold">Upgrade Storage Package</h2>
            <p className="text-white/40 text-xs mb-4">Select a plan to increase your storage capacity</p>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[13px] font-bold mb-3">📦 Small Package <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded-full">Popular</span></p>
                <div className="space-y-2">
                  {small.map(p=>(
                    <div key={p.id} onClick={()=>setPlan(p.id)} className={`flex justify-between items-center p-3 rounded-xl border-2 cursor-pointer ${plan===p.id? 'border-[#00FF88] bg-[#00FF88]/10 shadow-[0_0_15px_rgba(0,255,136,0.2)]' : 'border-white/5 bg-[#1F1F23]'}`}>
                      <span className="flex items-center gap-2 text-[13px]"><span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${plan===p.id?'border-[#00FF88]':'border-white/20'}`}>{plan===p.id && <span className="w-2 h-2 bg-[#00FF88] rounded-full"></span>}</span>{p.id}</span>
                      <span className="text-xs text-white/60">{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="opacity-60">
                <p className="text-[13px] font-bold mb-3">🗄️ Big Package <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded-full">Enterprise</span></p>
                <div className="space-y-2">
                  {big.map(p=>(
                    <div key={p.id} className="flex justify-between items-center p-3 rounded-xl border border-white/5 bg-[#1F1F23]/50 cursor-not-allowed">
                      <span className="flex items-center gap-2 text-[13px]"><span className="w-4 h-4 rounded-full border border-white/20"></span>{p.id}</span>
                      <span className={`text-xs ${p.id==='1PB+'?'text-[#00FF88]':'text-white/40'}`}>{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-5 pt-4 border-t border-white/5">
              <span className="text-[11px] text-white/40">Selected: <b className="text-white">{plan}</b> • Click {hasStorage? 'Upgrade' : 'Select'} to pay</span>
              <button onClick={()=>{setPaid(true); setHasStorage(true)}} className="bg-[#00FF88] text-black font-black px-6 py-2.5 rounded-full text-xs hover:bg-[#00FF88]/90">
                {hasStorage? `Upgrade Now →` : `Select Now →`}
              </button>
            </div>
          </div>

          <div className="flex justify-between text-[10px] text-white/30">
            <span>🔒 SIGILLUQ 616TB - Encrypted</span>
            <span className="border border-white/15 px-3 py-1 rounded-full">U.S. Pat. App. No. 64/153,968 - Patent Pending</span>
            <span>© 2026 SIGILLUQ - All Rights Reserved</span>
          </div>
        </div>
      </div>
    </div>
  )
}
