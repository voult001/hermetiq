"use client"
import { useState } from "react"

type FileItem = { name: string; size: string; icon: string; detail: string }

const initialFiles: FileItem[] = [
  { name: "Contracts", size: "3.2 GB", icon: "📁", detail: "12 items" },
  { name: "Q4_Financial_Report.pdf", size: "24.8 MB", icon: "📄", detail: "2 days ago" },
  { name: "Product_Assets", size: "1.1 GB", icon: "🖼️", detail: "87 items" },
  { name: "Investor_Deck_v3.pptx", size: "8.3 MB", icon: "📄", detail: "1 week ago" },
  { name: "API_Documentation.md", size: "156 KB", icon: "📄", detail: "2 weeks ago" },
  { name: "Backups_2024.zip", size: "512 MB", icon: "📦", detail: "1 month ago" },
]

export default function DashboardPage() {
  const [files, setFiles] = useState<FileItem[]>(initialFiles)
  const [plan, setPlan] = useState("100GB")
  const [dragOver, setDragOver] = useState(false)
  const [search, setSearch] = useState("")

  const handleFiles = (fileList: FileList) => {
    const newFiles: FileItem[] = Array.from(fileList).map(f => ({
      name: f.name,
      size: `${(f.size/1024/1024).toFixed(1)} MB`,
      icon: "📄",
      detail: "Just now"
    }))
    setFiles([...newFiles,...files])
  }

  const filtered = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))

  const smallPlans = [
    { id: "100GB", price: "$9 /mo" },
    { id: "500GB", price: "$29 /mo" },
    { id: "1TB", price: "$49 /mo" },
    { id: "2TB", price: "$79 /mo" },
    { id: "5TB", price: "$149 /mo" },
  ]
  const bigPlans = [
    { id: "10TB", price: "$249 /mo" },
    { id: "100TB", price: "$1,999 /mo" },
    { id: "500TB", price: "$7,500 /mo" },
    { id: "1PB+", price: "Custom Pricing" },
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white p-3 font-sans">
      {/* HEADER */}
      <div className="max-w-[1300px] mx-auto bg-[#1C1C1F] border border-white/10 rounded-xl px-4 py-3 flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <button onClick={()=>window.history.back()} className="text-white/60 text-[13px] hover:text-white">← Go Back</button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#00FF8A]/20 border border-[#00FF8A]/30 rounded-md flex items-center justify-center text-[#00FF8A]">🛡️</div>
            <h1 className="font-black tracking-wider text-[14px]"><span className="text-[#00FF8A]">SIGILLUQ</span> <span className="text-white">VAULT</span></h1>
            <span className="text-[9px] text-white/20 ml-2 tracking-widest">SAAS • SECURE CLOUD STORAGE</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-[#2A2A2E] px-3 py-1.5 rounded-full text-xs text-white/30">Q Search files...</div>
          <div className="w-6 h-6 bg-[#00FF8A]/20 rounded-full flex items-center justify-center text-[10px] text-[#00FF8A] font-bold">JS</div>
          <span className="text-xs text-white/60">john.smith@company</span>
          <button className="text-[11px] border border-white/10 px-4 py-1.5 rounded-full text-white/60 hover:bg-white/5">Log Out</button>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto grid grid-cols-[320px_1fr] gap-4">
        {/* LEFT - MY VAULT */}
        <div className="bg-[#16161A] border border-white/10 rounded-xl p-4 h-fit sticky top-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-[15px]">📁 My Vault</h2>
            <button onClick={()=>document.getElementById('fileInput')?.click()} className="text-[#00FF8A] text-xs hover:underline">+ New</button>
          </div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Q Search in vault..." className="w-full bg-[#232326] border border-white/5 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#00FF8A]/30 mb-4" />
          <p className="text-[10px] text-white/20 tracking-widest mb-3">FILES</p>
          <div className="space-y-2 max-h-[60vh] overflow-auto">
            {filtered.map((f,i)=>(
              <div key={i} className="flex gap-3 bg-[#1F1F23] hover:bg-[#252529] p-2.5 rounded-lg cursor-pointer border border-transparent hover:border-white/5">
                <span className="text-[18px]">{f.icon}</span>
                <div className="leading-tight overflow-hidden">
                  <p className="text-[13px] truncate font-medium">{f.name}</p>
                  <p className="text-[11px] text-white/30">{f.detail} • {f.size}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-[#00FF8A] mt-6">● Synced • All files secure</p>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          {/* STORAGE USAGE */}
          <div className="bg-[#16161A] border border-white/10 rounded-xl p-5">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-bold flex items-center gap-2">💾 Storage Usage 62%</h2>
              <span className="text-[10px] border border-[#00FF8A]/30 text-[#00FF8A] px-3 py-1 rounded-full bg-[#00FF8A]/10">Pro Plan • Active</span>
            </div>

            <div className="grid grid-cols-[140px_1fr] gap-6 items-center">
              <div className="text-center">
                <div className="w-[110px] h-[110px] mx-auto rounded-full border-[8px] border-[#00FF8A] border-t-white/10 border-r-[#00FF8A] flex items-center justify-center text-[28px] font-black text-[#00FF8A] rotate-[-45deg]"><span className="rotate-[45deg]">62%</span></div>
                <p className="text-[11px] text-white/30 mt-3">1.24 TB / 2 TB used</p>
              </div>

              <div>
                <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                  <div className="bg-[#232326] p-3 rounded-lg"><p className="text-white/30">Used</p><p className="font-bold">1.24 TB</p></div>
                  <div className="bg-[#232326] p-3 rounded-lg"><p className="text-white/30">Available</p><p className="font-bold">760 GB</p></div>
                  <div className="bg-[#232326] p-3 rounded-lg"><p className="text-white/30">Files</p><p className="font-bold">{files.length}</p></div>
                </div>

                <div
                  onDragOver={e=>{e.preventDefault(); setDragOver(true)}}
                  onDragLeave={()=>setDragOver(false)}
                  onDrop={e=>{e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files)}}
                  className={`border border-dashed rounded-xl py-5 text-center transition-all ${dragOver? 'border-[#00FF8A] bg-[#00FF8A]/10' : 'border-[#00FF8A]/50 bg-[#00FF8A]/[0.03]'}`}
                >
                  <p className="text-[#00FF8A] font-bold text-sm">⬇ Drag & drop files here to upload</p>
                  <p className="text-white/40 text-[11px] mt-1">or click to browse • Max 10GB per file • Encrypted</p>
                  <button onClick={()=>document.getElementById('fileInput')?.click()} className="mt-2 text-[#00FF8A] text-xs underline">Browse Files</button>
                  <input id="fileInput" type="file" multiple hidden onChange={e=> e.target.files && handleFiles(e.target.files)} />
                </div>
              </div>
            </div>
          </div>

          {/* UPGRADE PACKAGE - FUNCIONANDO */}
          <div className="bg-[#16161A] border border-white/10 rounded-xl p-5">
            <h2 className="font-bold text-[15px]">Upgrade Storage Package</h2>
            <p className="text-white/40 text-xs mb-5">Select a plan to increase your storage capacity</p>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-[13px] font-bold mb-3 flex items-center gap-2">📦 Small Package <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded-full text-white/40">Popular</span></h3>
                <div className="space-y-2">
                  {smallPlans.map(p=>(
                    <div key={p.id} onClick={()=>setPlan(p.id)} className={`flex justify-between items-center p-3 rounded-lg border cursor-pointer transition-all ${plan===p.id? 'bg-[#00FF8A]/10 border-[#00FF8A] text-white' : 'bg-[#1F1F23] border-white/5 hover:border-white/10'}`}>
                      <span className="flex items-center gap-2"><span className={`w-4 h-4 rounded-full border flex items-center justify-center ${plan===p.id? 'border-[#00FF8A]' : 'border-white/20'}`}>{plan===p.id && <span className="w-2 h-2 bg-[#00FF8A] rounded-full"></span>}</span>{p.id}</span>
                      <span className="text-white/60 text-xs">{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[13px] font-bold mb-3 flex items-center gap-2">🗄️ Big Package <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded-full text-white/40">Enterprise</span></h3>
                <div className="space-y-2">
                  {bigPlans.map(p=>(
                    <div key={p.id} onClick={()=>setPlan(p.id)} className={`flex justify-between items-center p-3 rounded-lg border cursor-pointer transition-all ${plan===p.id? 'bg-white/10 border-white text-white' : 'bg-[#1F1F23] border-white/5 hover:border-white/10'}`}>
                      <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full border border-white/20"></span>{p.id}</span>
                      <span className={`text-xs ${p.id==='1PB+'? 'text-[#00FF8A]' : 'text-white/60'}`}>{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
              <span className="text-[11px] text-white/40">Selected: <b className="text-white">{plan}</b> • Click Upgrade to pay</span>
              <button onClick={()=>alert(`Pagando ${plan} - Redirigiendo a Stripe...`)} className="bg-[#00FF8A] hover:bg-[#00FF8A]/90 text-black font-black px-6 py-2.5 rounded-full text-xs">Upgrade Now →</button>
            </div>
          </div>

          {/* FOOTER PATENTE */}
          <div className="flex justify-between items-center text-[10px] text-white/30 px-1">
            <span>🔒 SIGILLUQ 616TB - Encrypted</span>
            <span className="border border-[#00FF8A]/30 bg-[#00FF8A]/5 text-[#00FF8A]/80 px-4 py-1.5 rounded-full">U.S. Pat. App. No. 64/153,968 - Patent Pending</span>
            <span>© 2026 SIGILLUQ - All Rights Reserved</span>
          </div>
        </div>
      </div>
    </div>
  )
}
