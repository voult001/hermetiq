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
    // Aqui va tu Stripe
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
    <div className="min-h-screen bg-[#0A0A0C] text-white p-2">
      {/* HEADER IGUAL A TU FOTO */}
      <div className="max-w-[1250px] mx-auto bg-[#1C1C1F] border border-white/10 rounded-xl px-4 py-3 flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <span className="text-white/50 text-xs">← Go Back</span>
          <span className="bg-[#00FF88]/20 border border-[#00FF88]/30 px-2 py-1 rounded text-[10px] text-[#00FF88]">🛡️</span>
          <h1 className="font-black text-[13px] tracking-widest"><span className="text-[#00FF88]">SIGILLUQ</span> VAULT</h1>
          <span className="text-[8px] text-white/20">SAAS • SECURE CLOUD STORAGE</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <span className="w-5 h-5 bg-[#00FF88]/20 rounded-full flex items-center justify-center text-[#00FF88] text-[10px]">JS</span>
          john.smith@company <span className="border border-white/10 px-3 py-1 rounded-full ml-2">Log Out</span>
        </div>
      </div>

      <div className="max-w-[1250px] mx-auto grid grid-cols-[300px_1fr] gap-3">
        {/* MY VAULT IGUAL */}
        <div className="bg-[#16161A] border border-white/10 rounded-xl p-4 h-fit">
          <div className="flex justify-between mb-3"><h2 className="font-bold text-sm">📁 My Vault</h2><span className="text-[#00FF88] text-xs">+ New</span></div>
          <input placeholder="Q Search in vault..." className="w-full bg-[#232326] rounded-lg px-3 py-2 text-xs mb-3 outline-none" />
          {files.map((f,i)=>(
            <div key={i} className="bg-[#1F1F23] p-2.5 rounded-lg mb-2 flex gap-2">
              <span className="text-[14px]">📁</span>
              <div><p className="text-[12px] truncate">{f.name}</p><p className="text-[10px] text-white/30">{f.detail}</p></div>
            </div>
          ))}
          <p className="text-[11px] text-[#00FF88] mt-4">● Synced - All files secure</p>
        </div>

        <div className="space-y-3">
          {/* STORAGE USAGE - AHORA CON CANDADO */}
          <div className="bg-[#16161A] border border-white/10 rounded-xl p-4">
            <div className="flex justify-between"><h2 className="font-bold text-sm">💾 Storage Usage 62%</h2><span className="text-[9px] border border-[#00FF88]/30 text-[#00FF88] px-2 py-1 rounded-full bg-[#00FF88]/10">Pro Plan • Active</span></div>

            <div className="grid grid-cols-[120px_1fr] gap-4 mt-4">
              <div className="text-center"><div className="w-[90px] h-[90px] rounded-full border-[7px] border-[#00FF88] border-t-white/10 flex items-center justify-center mx-auto font-black text-[#00FF88]">62%</div><p className="text-[10px] text-white/30 mt-2">1.24 TB / 2 TB used</p></div>

              <div>
                <div className="grid grid-cols-3 gap-2 mb-3 text-[11px]">
                  <div className="bg-[#232326] p-2 rounded">Used<br/><b>1.24 TB</b></div>
                  <div className="bg-[#232326] p-2 rounded">Available<br/><b>760 GB</b></div>
                  <div className="bg-[#232326] p-2 rounded">Files<br/><b>{files.length}</b></div>
                </div>

                {/* ESTE ES EL BOX QUE AHORA TIENE CANDADO */}
                <div
                  onDragOver={e=>{if(hasPaid){e.preventDefault(); setDragOver(true)}}}
                  onDragLeave={()=>setDragOver(false)}
                  onDrop={e=>{if(hasPaid){e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files)}}}
                  className={`border border-dashed rounded-xl py-6 text-center relative transition-all ${!hasPaid? 'border-[#FFB020]/40 bg-[#FFB020]/[0.04]' : dragOver? 'border-[#00FF88] bg-[#00FF88]/10' : 'border-[#00FF88]/50 bg-[#00FF88]/[0.03]'}`}
                >
                  {!hasPaid? (
                    <>
                      <p className="font-black text-[#FFB020] text-sm">🔒 Select Package First</p>
                      <p className="text-white/40 text-[11px] mt-1">Select a storage package below to unlock uploads</p>
                      <p className="text-white/20 text-[10px] mt-1">Browse Files is disabled</p>
                    </>
                  ) : (
                    <>
                      <p className="font-bold text-[#00FF88] text-sm">⬇ Drag & drop files here to upload</p>
                      <p className="text-white/40 text-[11px] mt-1">or click to browse • Max 10GB per file • Encrypted</p>
                      <button onClick={()=>document.getElementById('fileInput')?.click()} className="mt-1 text-[#00FF88] text-xs underline">Browse Files</button>
                      <input id="fileInput" type="file" multiple hidden onChange={e=>e.target.files && handleFiles(e.target.files)} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* PACKAGES - IGUALITO A TU FOTO */}
          <div className="bg-[#16161A] border border-white/10 rounded-xl p-4">
            <h2 className="font-bold text-sm">Upgrade Storage Package</h2>
            <p className="text-white/40 text-[11px] mb-3">Select a plan to increase your storage capacity</p>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold mb-2">📦 Small Package <span className="text-[8px] bg-white/10 px-2 py-0.5 rounded-full ml-2">Popular</span></p>
                {small.map(p=>(
                  <div key={p.id} onClick={()=>setSelected(p.id)} className={`flex justify-between items-center p-2.5 rounded-lg border mb-2 cursor-pointer ${selected===p.id? 'bg-[#00FF88]/10 border-[#00FF88] shadow-[0_0_12px_rgba(0,255,136,0.15)]' : 'bg-[#1F1F23] border-white/5'}`}>
                    <span className="flex items-center gap-2 text-xs"><span className={`w-4 h-4 rounded-full border flex items-center justify-center ${selected===p.id?'border-[#00FF88]':'border-white/20'}`}>{selected===p.id && <span className="w-2 h-2 bg-[#00FF88] rounded-full"></span>}</span>{p.id}</span>
                    <span className="text-[11px] text-white/50">{p.price}</span>
                  </div>
                ))}
              </div>
              <div className="opacity-70">
                <p className="text-xs font-bold mb-2">🗄️ Big Package <span className="text-[8px] bg-white/10 px-2 py-0.5 rounded-full ml-2">Enterprise</span></p>
                {[["10TB","$249 /mo"],["100TB","$1,999 /mo"],["500TB","$7,500 /mo"],["1PB+","Custom Pricing"]].map(([id,price])=>(
                  <div key={id} className="flex justify-between items-center p-2.5 rounded-lg border border-white/5 bg-[#1F1F23] mb-2 text-xs"><span className="flex gap-2"><span className="w-4 h-4 rounded-full border border-white/20"></span>{id}</span><span className={`${id==='1PB+'?'text-[#00FF88]':'text-white/50'} text-[11px]`}>{price}</span></div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
              <span className="text-[11px] text-white/40">Selected: <b className="text-white">{selected}</b> • Click {hasPaid? 'Upgrade' : 'Select'} to pay</span>
              <button onClick={handlePay} className="bg-[#00FF88] text-black font-black px-5 py-2 rounded-full text-xs">
                {!hasPaid? `Select Now →` : `Upgrade Now →`}
              </button>
            </div>
          </div>

          <div className="flex justify-between text-[9px] text-white/25 px-1">
            <span>🔒 SIGILLUQ 616TB - Encrypted</span>
            <span className="border border-[#00FF88]/20 px-3 py-1 rounded-full text-[#00FF88]/70">U.S. Pat. App. No. 64/153,968 - Patent Pending</span>
            <span>© 2026 SIGILLUQ</span>
          </div>
        </div>
      </div>
    </div>
  )
}
