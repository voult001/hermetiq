"use client"
import { useState } from "react"

export default function DashboardPage() {
  const [selected, setSelected] = useState("100GB")
  const [hasPaid, setHasPaid] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [files, setFiles] = useState([
    { name: "Contracts", detail: "12 items • 3.2 GB" },
    { name: "Q4_Financial_Report.pdf", detail: "2 days ago • 24.8 MB" },
    { name: "Product_Assets", detail: "87 items • 1.1 GB" },
    { name: "Investor_Deck_v3.pptx", detail: "1 week ago • 8.3 MB" },
    { name: "API_Documentation.md", detail: "2 weeks ago • 156 KB" },
    { name: "Backups_2024.zip", detail: "1 month ago • 512 MB" },
  ])

  const small = [
    { id: "100GB", price: "$9 /mo" },
    { id: "500GB", price: "$29 /mo" },
    { id: "1TB", price: "$49 /mo" },
    { id: "2TB", price: "$79 /mo" },
    { id: "5TB", price: "$149 /mo" },
  ]

  const handlePay = () => {
    alert(`Pagando ${selected}...`)
    setHasPaid(true)
  }

  const handleFiles = (list: FileList) => {
    if (!hasPaid) return
    const newFiles = Array.from(list).map(f => ({
      name: f.name,
      detail: `Just now • ${(f.size/1024/1024).toFixed(1)} MB`
    }))
    setFiles([...newFiles,...files])
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white p-4">
      {/* HEADER MAS GRANDE */}
      <div className="max-w-[95%] mx-auto bg-[#1C1C1F] border border-white/10 rounded-xl px-6 py-4 flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <span className="text-white/50 text-sm cursor-pointer hover:text-white">← Go Back</span>
          <span className="bg-[#00FF88]/20 border border-[#00FF88]/30 px-3 py-1.5 rounded text-[11px] text-[#00FF88]">🛡️</span>
          <h1 className="font-black text-[15px] tracking-widest"><span className="text-[#00FF88]">SIGILLUQ</span> VAULT</h1>
          <span className="text-[9px] text-white/20">SAAS • SECURE CLOUD STORAGE</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-white/60">
          <span className="w-6 h-6 bg-[#00FF88]/20 rounded-full flex items-center justify-center text-[#00FF88] text-[11px]">JS</span>
          john.smith@company <span className="border border-white/10 px-4 py-1.5 rounded-full ml-2 cursor-pointer">Log Out</span>
        </div>
      </div>

      <div className="max-w-[95%] mx-auto grid grid-cols-[340px_1fr] gap-4">
        {/* MY VAULT MAS GRANDE */}
        <div className="bg-[#16161A] border border-white/10 rounded-xl p-5 h-fit">
          <div className="flex justify-between mb-4"><h2 className="font-bold text-[15px]">📁 My Vault</h2><span className="text-[#00FF88] text-sm">+ New</span></div>
          <input placeholder="Q Search in vault..." className="w-full bg-[#232326] rounded-lg px-4 py-2.5 text-sm mb-4 outline-none" />
          {files.map((f,i)=>(
            <div key={i} className="bg-[#1F1F23] p-3 rounded-lg mb-2.5 flex gap-3">
              <span className="text-[16px]">📁</span>
              <div><p className="text-[13px] truncate">{f.name}</p><p className="text-[11px] text-white/30">{f.detail}</p></div>
            </div>
          ))}
          <p className="text-[12px] text-[#00FF88] mt-5">● Synced - All files secure</p>
        </div>

        <div className="space-y-4">
          <div className="bg-[#16161A] border border-white/10 rounded-xl p-5">
            <div className="flex justify-between"><h2 className="font-bold text-[15px]">💾 Storage Usage 62%</h2><span className="text-[10px] border border-[#00FF88]/30 text-[#00FF88] px-3 py-1 rounded-full bg-[#00FF88]/10">Pro Plan • Active</span></div>

            <div className="grid grid-cols-[140px_1fr] gap-6 mt-5">
              <div className="text-center"><div className="w-[105px] h-[105px] rounded-full border-[8px] border-[#00FF88] border-t-white/10 flex items-center justify-center mx-auto font-black text-[18px] text-[#00FF88]">62%</div><p className="text-[11px] text-white/30 mt-3">1.24 TB / 2 TB used</p></div>

              <div>
                <div className="grid grid-cols-3 gap-3 mb-4 text-[12px]">
                  <div className="bg-[#232326] p-3 rounded-lg">Used<br/><b className="text-[14px]">1.24 TB</b></div>
                  <div className="bg-[#232326] p-3 rounded-lg">Available<br/><b className="text-[14px]">760 GB</b></div>
                  <div className="bg-[#232326] p-3 rounded-lg">Files<br/><b className="text-[14px]">{files.length}</b></div>
                </div>

                <div
                  onDragOver={e=>{if(hasPaid){e.preventDefault(); setDragOver(true)}}}
                  onDragLeave={()=>setDragOver(false)}
                  onDrop={e=>{if(hasPaid){e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files)}}}
                  className={`border border-dashed rounded-xl py-8 text-center transition-all ${!hasPaid? 'border-[#FFB020]/40 bg-[#FFB020]/[0.04]' : dragOver? 'border-[#00FF88] bg-[#00FF88]/10' : 'border-[#00FF88]/50 bg-[#00FF88]/[0.03]'}`}
                >
                  {!hasPaid? (
                    <>
                      <p className="font-black text-[#FFB020] text-[16px]">🔒 Select Package First</p>
                      <p className="text-white/40 text-[12px] mt-1">Select a storage package below to unlock uploads</p>
                      <p className="text-white/20 text-[11px] mt-1">Browse Files is disabled</p>
                    </>
                  ) : (
                    <>
                      <p className="font-bold text-[#00FF88] text-[15px]">⬇ Drag & drop files here to upload</p>
                      <p className="text-white/40 text-[12px] mt-1">or click to browse • Max 10GB per file • Encrypted</p>
                      <button onClick={()=>document.getElementById('fileInput')?.click()} className="mt-2 text-[#00FF88] text-sm underline">Browse Files</button>
                      <input id="fileInput" type="file" multiple hidden onChange={e=>e.target.files && handleFiles(e.target.files)} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#16161A] border border-white/10 rounded-xl p-5">
            <h2 className="font-bold text-[15px]">Upgrade Storage Package</h2>
            <p className="text-white/40 text-[12px] mb-4">Select a plan to increase your storage capacity</p>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-[13px] font-bold mb-3">📦 Small Package <span className="text-[9px] bg-white/10 px-2.5 py-1 rounded-full ml-2">Popular</span></p>
                {small.map(p=>(
                  <div key={p.id} onClick={()=>setSelected(p.id)} className={`flex justify-between items-center p-3 rounded-lg border mb-2.5 cursor-pointer ${selected===p.id? 'bg-[#00FF88]/10 border-[#00FF88] shadow-[0_0_12px_rgba(0,255,136,0.15)]' : 'bg-[#1F1F23] border-white/5'}`}>
                    <span className="flex items-center gap-3 text-[13px]"><span className={`w-5 h-5 rounded-full border flex items-center justify-center ${selected===p.id?'border-[#00FF88]':'border-white/20'}`}>{selected===p.id && <span className="w-2.5 h-2.5 bg-[#00FF88] rounded-full"></span>}</span>{p.id}</span>
                    <span className="text-[12px] text-white/50">{p.price}</span>
                  </div>
                ))}
              </div>
              <div className="opacity-70">
                <p className="text-[13px] font-bold mb-3">🗄️ Big Package <span className="text-[9px] bg-white/10 px-2.5 py-1 rounded-full ml-2">Enterprise</span></p>
                {[["10TB","$249 /mo"],["100TB","$1,999 /mo"],["500TB","$7,500 /mo"],["1PB+","Custom Pricing"]].map(([id,price])=>(
                  <div key={id} className="flex justify-between items-center p-3 rounded-lg border border-white/5 bg-[#1F1F23] mb-2.5 text-[13px]"><span className="flex gap-3"><span className="w-5 h-5 rounded-full border border-white/20"></span>{id}</span><span className={`${id==='1PB+'?'text-[#00FF88]':'text-white/50'} text-[12px]`}>{price}</span></div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
              <span className="text-[12px] text-white/40">Selected: <b className="text-white">{selected}</b> • Click {hasPaid? 'Upgrade' : 'Select'} to pay</span>
              <button onClick={handlePay} className="bg-[#00FF88] text-black font-black px-6 py-2.5 rounded-full text-[13px] hover:bg-[#00FF88]/90">
                {!hasPaid? `Select Now →` : `Upgrade Now →`}
              </button>
            </div>
          </div>

          <div className="flex justify-between text-[10px] text-white/25 px-2">
            <span>🔒 SIGILLUQ 616TB - Encrypted</span>
            <span className="border border-[#00FF88]/20 px-4 py-1 rounded-full text-[#00FF88]/70">U.S. Pat. App. No. 64/153,968 - Patent Pending</span>
            <span>© 2026 SIGILLUQ</span>
          </div>
        </div>
      </div>
    </div>
  )
}
