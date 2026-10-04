"use client"
import { useState } from "react"
import { HardDrive, Shield, Lock, Plus, LogOut, Server, Upload, File, Folder } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SiloPage(){
  const router = useRouter()
  const [selected, setSelected] = useState("100GB")
  const [hasPaid, setHasPaid] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [files, setFiles] = useState([
    { name: "Contracts", detail: "12 items • 3.2 GB", icon: "folder" },
    { name: "Q4_Financial_Report.pdf", detail: "2 days ago • 24.8 MB", icon: "file" },
    { name: "Product_Assets", detail: "87 items • 1.1 GB", icon: "folder" },
    { name: "Investor_Deck_v3.pptx", detail: "1 week ago • 8.3 MB", icon: "file" },
  ])

  const small = [
    { id: "100GB", price: "$9 /mo" },
    { id: "500GB", price: "$29 /mo" },
    { id: "1TB", price: "$49 /mo" },
    { id: "2TB", price: "$79 /mo" },
    { id: "5TB", price: "$149 /mo" },
  ]

  const handlePay = () => {
    setHasPaid(true)
  }

  const handleFiles = (list: FileList) => {
    if (!hasPaid) return
    const newFiles = Array.from(list).map(f => ({
      name: f.name,
      detail: `Just now • ${(f.size/1024/1024).toFixed(1)} MB`,
      icon: "file"
    }))
    setFiles([...newFiles,...files])
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="border-b border-zinc-800 bg-[#0a0a0a] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#39FF14] rounded-lg flex items-center justify-center font-black text-black">S</div>
            <span className="text-white font-bold">SIGILLUQ</span>
            <span className="text-zinc-600 text-sm ml-2">Silo • 616TB Encrypted</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/choose-role')} className="text-zinc-400 hover:text-white text-sm border border-zinc-800 px-4 py-2 rounded-full hover:border-zinc-700">
              ← Go Back
            </button>
            <button onClick={() => router.push('/')} className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm border border-zinc-800 px-4 py-2 rounded-full hover:border-zinc-700">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Vault</h1>
        <p className="text-zinc-400 mb-10">Your SIGILLUQ Silo is encrypted & distributed across the network</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#111] border border-zinc-800 rounded-[24px] p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-2xl flex items-center justify-center">
                <HardDrive className="w-6 h-6 text-[#39FF14]" />
              </div>
              <span className="text-[10px] bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/20 px-3 py-1 rounded-full font-bold">{files.length} FILES</span>
            </div>
            <div className="text-zinc-400 text-sm mb-2">Storage Usage</div>
            <div className="text-4xl font-bold text-white mb-1">62%</div>
            <div className="text-sm text-zinc-500 mb-6">1.24 TB / 2 TB used</div>
            <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#39FF14] h-full w-[62%] shadow-[0_0_10px_#39FF14]"></div>
            </div>
          </div>

          <div className="bg-[#111] border border-zinc-800 rounded-[24px] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#39FF14]/5 rounded-full blur-3xl"></div>
            <div className="flex justify-between items-start mb-6 relative">
              <div className="w-12 h-12 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#39FF14]" />
              </div>
              <span className="text-[10px] bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/20 px-3 py-1 rounded-full font-bold">ENCRYPTED</span>
            </div>
            <div className="text-zinc-400 text-sm mb-2 relative">Security Status</div>
            <div className="text-4xl font-bold text-white mb-1 relative">Military</div>
            <div className="text-sm text-[#39FF14] mb-6 relative">Grade • Zero-knowledge • Blind shards</div>
            <div className="bg-zinc-900 rounded-xl p-3 text-xs text-zinc-400 flex items-center gap-2 relative"><Lock className="w-4 h-4 text-zinc-500" /> Only you hold the key. Hosts can't see your data.</div>
          </div>

          <div className="bg-[#111] border border-zinc-800 rounded-[24px] p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-2xl flex items-center justify-center">
                <Server className="w-6 h-6 text-[#39FF14]" />
              </div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-[#39FF14] rounded-full animate-pulse"></div><span className="text-[#39FF14] text-xs font-bold">616TB NETWORK</span></div>
            </div>
            <div className="text-zinc-400 text-sm mb-2">Current Plan</div>
            <div className="text-4xl font-bold text-white mb-1">{selected}</div>
            <div className="text-sm text-zinc-500 mb-6">{hasPaid? 'Active • Encrypted & Distributed' : 'Select storage below'}</div>
            <div className="bg-zinc-900 rounded-xl p-3 text-xs text-zinc-400 flex items-center gap-2"><Upload className="w-4 h-4 text-zinc-500" /> {hasPaid? 'Drag & drop enabled' : 'Select storage to unlock uploads'}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#111] border border-zinc-800 rounded-[24px] p-8">
              <h3 className="text-white font-bold text-xl mb-6">Upload Files</h3>
              <div
                onDragOver={e=>{if(hasPaid){e.preventDefault(); setDragOver(true)}}}
                onDragLeave={()=>setDragOver(false)}
                onDrop={e=>{if(hasPaid){e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files)}}}
                className={`border border-dashed rounded-[20px] py-12 text-center transition-all ${!hasPaid? 'border-[#FFB020]/30 bg-[#FFB020]/5' : dragOver? 'border-[#39FF14] bg-[#39FF14]/10' : 'border-[#39FF14]/30 bg-[#39FF14]/5'}`}
              >
                {!hasPaid? (
                  <>
                    <div className="w-16 h-16 bg-[#FFB020]/10 border border-[#FFB020]/20 rounded-2xl flex items-center justify-center mx-auto mb-4"><Lock className="w-8 h-8 text-[#FFB020]" /></div>
                    <p className="font-bold text-[#FFB020] text-lg">Select Storage First</p>
                    <p className="text-zinc-500 text-sm mt-1">Select storage below to unlock uploads</p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-2xl flex items-center justify-center mx-auto mb-4"><Upload className="w-8 h-8 text-[#39FF14]" /></div>
                    <p className="font-bold text-[#39FF14] text-lg">Drag & drop files here</p>
                    <p className="text-zinc-500 text-sm mt-1">or click to browse • Max 10GB per file • Encrypted</p>
                    <button onClick={()=>document.getElementById('fileInput')?.click()} className="mt-4 bg-[#39FF14] text-black font-bold px-6 py-2.5 rounded-full text-sm hover:bg-[#39FF14]/90">
                      Browse Files
                    </button>
                    <input id="fileInput" type="file" multiple hidden onChange={e=>e.target.files && handleFiles(e.target.files)} />
                  </>
                )}
              </div>
            </div>

            <div className="bg-[#111] border border-zinc-800 rounded-[24px] p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-xl">My Silo</h3>
                <span className="text-zinc-500 text-sm">{files.length} items • Encrypted</span>
              </div>
              <div className="space-y-3">
                {files.map((f,i)=>(
                  <div key={i} className="bg-black border border-zinc-800 rounded-2xl p-4 flex items-center justify-between hover:border-zinc-700 transition">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center">
                        {f.icon === 'folder'? <Folder className="w-5 h-5 text-zinc-400" /> : <File className="w-5 h-5 text-zinc-400" />}
                      </div>
                      <div><div className="text-white font-bold text-sm">{f.name}</div><div className="text-zinc-500 text-xs">{f.detail}</div></div>
                    </div>
                    <div className="text-[#39FF14] text-xs">🔒</div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 border border-dashed border-[#39FF14]/40 bg-[#39FF14]/5 hover:bg-[#39FF14]/10 text-[#39FF14] font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition">
                <Plus className="w-5 h-5" /> New Folder
              </button>
            </div>
          </div>

          {/* SELECT STORAGE - ARREGLADO */}
          <div className="bg-[#111] border border-zinc-800 rounded-[24px] p-8 h-fit">
            <h3 className="text-white font-bold text-xl mb-2">Select Storage</h3>
            <p className="text-zinc-500 text-xs mb-6">Select a plan to start</p>

            <div className="mb-6">
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Small Package • Popular</p>
              {small.map(p=>(
                <div key={p.id} onClick={()=>setSelected(p.id)} className={`flex justify-between items-center p-4 rounded-2xl border mb-3 cursor-pointer transition ${selected===p.id? 'bg-[#39FF14]/10 border-[#39FF14] shadow-[0_0_15px_rgba(57,255,20,0.15)]' : 'bg-black border-zinc-800 hover:border-zinc-700'}`}>
                  <span className="flex items-center gap-3 text-sm"><span className={`w-5 h-5 rounded-full border flex items-center justify-center ${selected===p.id?'border-[#39FF14]':'border-zinc-600'}`}>{selected===p.id && <span className="w-2.5 h-2.5 bg-[#39FF14] rounded-full"></span>}</span><span className={selected===p.id?'text-white font-bold':'text-zinc-400'}>{p.id}</span></span>
                  <span className={`text-xs ${selected===p.id?'text-[#39FF14] font-bold':'text-zinc-500'}`}>{p.price}</span>
                </div>
              ))}
            </div>

            <div className="opacity-60 mb-6">
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Big Package • Enterprise</p>
              {[["10TB","$249 /mo"],["100TB","$1,999 /mo"],["500TB","$7,500 /mo"]].map(([id,price])=>(
                <div key={id} className="flex justify-between items-center p-4 rounded-2xl border border-zinc-800 bg-black mb-3 text-sm"><span className="flex gap-3"><span className="w-5 h-5 rounded-full border border-zinc-700"></span><span className="text-zinc-500">{id}</span></span><span className="text-zinc-600 text-xs">{price}</span></div>
              ))}
            </div>

            <button onClick={handlePay} className="w-full rounded-full bg-[#39FF14] text-black font-bold text-sm py-4 hover:bg-[#39FF14]/90 transition">
              {hasPaid? `Upgrade to ${selected} →` : `Select ${selected} →`}
            </button>

            <div className="mt-6 bg-black rounded-xl p-4 border border-zinc-800">
              <div className="text-zinc-500 text-[11px] uppercase tracking-widest font-bold mb-2">Security Info</div>
              <div className="text-zinc-400 text-xs leading-relaxed">Zero-knowledge encryption. Your silo stores only encrypted fragments. SIGILLUQ hosts cannot see, open or access your files. Redundant & blind by design. 616TB Network.</div>
            </div>
          </div>
        </div>

        <div className="text-center text-zinc-600 text-xs mt-12">SIGILLUQ • Patent Pending • 616TB Network • Encrypted & Distributed</div>
      </div>
    </div>
  )
}
