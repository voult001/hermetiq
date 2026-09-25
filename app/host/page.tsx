"use client"
import { useState } from "react"

export default function HostPage() {
  const [selected, setSelected] = useState("Pro")
  const [hasPaid, setHasPaid] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [hosts, setHosts] = useState([
    { name: "sigilluq.com", status: "Live", url: "sigilluq.com", detail: "2h ago • Vercel" },
    { name: "vault.sigilluq.com", status: "Live", url: "vault.sigilluq.com", detail: "1d ago • 2.1 GB" },
    { name: "api.sigilluq.com", status: "Building", url: "api.sigilluq.com", detail: "Just now • Deploying" },
  ])

  const plans = [
    { id: "Starter", price: "$19 /mo", specs: "1 Host • 100GB BW" },
    { id: "Pro", price: "$49 /mo", specs: "10 Hosts • 1TB BW" },
    { id: "Enterprise", price: "$149 /mo", specs: "Unlimited • 10TB BW" },
  ]

  const handlePay = () => {
    alert(`Pagando ${selected}...`)
    setHasPaid(true)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white p-4">
      {/* HEADER IGUAL AL VAULT GRANDE */}
      <div className="max-w-[95%] mx-auto bg-[#1C1C1F] border border-white/10 rounded-xl px-6 py-4 flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <span className="text-white/50 text-sm cursor-pointer hover:text-white" onClick={()=>window.location.href='/dashboard'}>← Go Back</span>
          <span className="bg-[#00FF88]/20 border border-[#00FF88]/30 px-3 py-1.5 rounded text-[11px] text-[#00FF88]">🛡️</span>
          <h1 className="font-black text-[15px] tracking-widest"><span className="text-[#00FF88]">SIGILLUQ</span> HOST</h1>
          <span className="text-[9px] text-white/20 tracking-widest">SAAS • SECURE HOSTING</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-white/60">
          <span className="w-6 h-6 bg-[#00FF88]/20 rounded-full flex items-center justify-center text-[#00FF88] text-[11px]">JS</span>
          john.smith@company <span className="border border-white/10 px-4 py-1.5 rounded-full ml-2 cursor-pointer" onClick={()=>window.location.href='/'}>Log Out</span>
        </div>
      </div>

      <div className="max-w-[95%] mx-auto grid grid-cols-[340px_1fr] gap-4">
        {/* LEFT - MY HOSTS IGUAL QUE MY VAULT */}
        <div className="bg-[#16161A] border border-white/10 rounded-xl p-5 h-fit">
          <div className="flex justify-between mb-4"><h2 className="font-bold text-[15px]">🖥️ My Hosts</h2><span className="text-[#00FF88] text-sm">+ New</span></div>
          <input placeholder="Q Search hosts..." className="w-full bg-[#232326] rounded-lg px-4 py-2.5 text-sm mb-4 outline-none" />
          {hosts.map((h,i)=>(
            <div key={i} className="bg-[#1F1F23] p-3 rounded-lg mb-2.5 flex justify-between items-center">
              <div className="flex gap-3 overflow-hidden"><span>🖥️</span><div className="overflow-hidden"><p className="text-[13px] truncate font-bold">{h.name}</p><p className="text-[11px] text-white/30 truncate">{h.detail}</p></div></div>
              <span className={`text-[9px] px-2.5 py-1 rounded-full h-fit ${h.status==='Live'?'bg-[#00FF88]/20 text-[#00FF88]':'bg-[#FFC44D]/20 text-[#FFC44D]'}`}>{h.status}</span>
            </div>
          ))}
          <p className="text-[12px] text-[#00FF88] mt-5">● 3 hosts active • All secure</p>
        </div>

        <div className="space-y-4">
          {/* DEPLOY - MISMO TAMAÑO QUE STORAGE USAGE */}
          <div className="bg-[#16161A] border border-white/10 rounded-xl p-5">
            <div className="flex justify-between"><h2 className="font-bold text-[15px]">🚀 Deployment 99.9%</h2><span className="text-[10px] border border-[#00FF88]/30 text-[#00FF88] px-3 py-1 rounded-full bg-[#00FF88]/10">{hasPaid?'Pro Plan • Active':'Locked'}</span></div>

            <div className="grid grid-cols-[140px_1fr] gap-6 mt-5">
              <div className="text-center"><div className="w-[105px] h-[105px] rounded-full border-[8px] border-[#00FF88] border-t-white/10 flex items-center justify-center mx-auto font-black text-[16px] text-[#00FF88]">LIVE</div><p className="text-[11px] text-white/30 mt-3">3 sites / 99.9% uptime</p></div>

              <div>
                <div className="grid grid-cols-3 gap-3 mb-4 text-[12px]">
                  <div className="bg-[#232326] p-3 rounded-lg">Deploys<br/><b className="text-[14px]">127</b></div>
                  <div className="bg-[#232326] p-3 rounded-lg">Bandwidth<br/><b className="text-[14px]">452 GB</b></div>
                  <div className="bg-[#232326] p-3 rounded-lg">Domains<br/><b className="text-[14px]">{hosts.length}</b></div>
                </div>

                <div
                  onDragOver={e=>{if(hasPaid){e.preventDefault(); setDragOver(true)}}}
                  onDragLeave={()=>setDragOver(false)}
                  onDrop={e=>{if(hasPaid){e.preventDefault(); setDragOver(false)}}}
                  className={`border border-dashed rounded-xl py-8 text-center transition-all ${!hasPaid? 'border-[#FFB020]/40 bg-[#FFB020]/[0.04]' : dragOver? 'border-[#00FF88] bg-[#00FF88]/10' : 'border-[#00FF88]/50 bg-[#00FF88]/[0.03]'}`}
                >
                  {!hasPaid? (
                    <>
                      <p className="font-black text-[#FFB020] text-[16px]">🔒 Select Package First</p>
                      <p className="text-white/40 text-[12px] mt-1">Select a hosting package below to unlock deploys</p>
                      <p className="text-white/20 text-[11px] mt-1">Deploy is disabled</p>
                    </>
                  ) : (
                    <>
                      <p className="font-bold text-[#00FF88] text-[15px]">⬆ Drag & drop project here</p>
                      <p className="text-white/40 text-[12px] mt-1">or click to browse • Next.js, React, Static • Encrypted</p>
                      <button className="mt-2 bg-[#00FF88] text-black font-black px-5 py-2 rounded-full text-xs">Browse Project</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* PLANS - MISMO TAMAÑO QUE VAULT */}
          <div className="bg-[#16161A] border border-white/10 rounded-xl p-5">
            <h2 className="font-bold text-[15px]">Upgrade Host Package</h2>
            <p className="text-white/40 text-[12px] mb-4">Select a plan to increase your hosting power</p>

            <div className="grid grid-cols-3 gap-4">
              {plans.map(p=>(
                <div key={p.id} onClick={()=>setSelected(p.id)} className={`p-4 rounded-xl border cursor-pointer ${selected===p.id?'bg-[#00FF88]/10 border-[#00FF88] shadow-[0_0_12px_rgba(0,255,136,0.15)]':'bg-[#1F1F23] border-white/5'}`}>
                  <p className="font-bold text-[14px]">{p.id}</p>
                  <p className="text-[11px] text-white/40 mt-1">{p.specs}</p>
                  <p className="text-[#00FF88] font-black text-[13px] mt-3">{p.price}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-5 pt-4 border-t border-white/5">
              <span className="text-[12px] text-white/40">Selected: <b className="text-white">{selected}</b> • Click {hasPaid?'Upgrade':'Select'} to pay</span>
              <button onClick={handlePay} className="bg-[#00FF88] text-black font-black px-6 py-2.5 rounded-full text-[13px]">
                {hasPaid? 'Upgrade Now →' : 'Select Now →'}
              </button>
            </div>
          </div>

          <div className="flex justify-between text-[10px] text-white/25 px-2">
            <span>🔒 SIGILLUQ HOST - Encrypted</span>
            <span className="border border-[#00FF88]/20 px-4 py-1 rounded-full text-[#00FF88]/70">U.S. Pat. App. No. 64/153,968 - Patent Pending</span>
            <span>© 2026 SIGILLUQ</span>
          </div>
        </div>
      </div>
    </div>
  )
}
