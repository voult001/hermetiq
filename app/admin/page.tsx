"use client"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useState, useEffect } from "react"
export default function Admin(){
  const [hosts,setHosts]=useState<any[]>([])
  const [time,setTime]=useState("14:32:09")
  useEffect(()=>{
    setHosts(JSON.parse(localStorage.getItem("sigilliq_hosts")||"[]"))
    setInterval(()=>setTime(new Date().toLocaleTimeString('en-GB',{hour12:false})),1000)
  },[])
  const totalTB = (hosts.reduce((a:number,b:any)=>a+parseFloat(b.libre||0),0)/1024).toFixed(2)
  return(
    <div className="min-h-screen bg-black text-[#b4ff39] font-mono">
      <SiteHeader />
      <main className="container mx-auto px-6 py-4 max-w-6xl">
        <div className="flex justify-between text-[11px] tracking-widest border-b border-[#b4ff39]/20 pb-2">
          <span className="font-black text-lg">SIGILLIUQ <span className="opacity-50 text-[10px]">v2.5 • ADMIN DASHBOARD</span></span>
          <div className="flex gap-3"><span className="text-green-400">● SYSTEM ONLINE</span><span>UTC {time}</span><span>ADMIN • ROOT</span></div>
        </div>
        <h2 className="mt-4 font-bold">Profit Metrics</h2>
        <div className="grid grid-cols-3 gap-3 mt-2">
          <div className="border border-[#b4ff39] bg-[#b4ff39]/10 p-4 rounded"><p className="text-[10px]">↗ Input</p><p className="text-4xl font-black">$9.99<span className="text-sm">/TB</span></p><p className="text-[10px] opacity-60">Input Revenue • {totalTB} TB • +2.4% WoW</p></div>
          <div className="border border-white/20 p-4 rounded"><p className="text-[10px]">⊞ Output</p><p className="text-4xl font-black">$4.75<span className="text-sm">/TB</span></p><p className="text-[10px] opacity-60">Output Revenue • +1.1% WoW</p></div>
          <div className="border border-white/20 p-4 rounded"><p className="text-[10px]">⚙ Auto Profit</p><p className="text-4xl font-black">$5.24<span className="text-sm">/TB</span></p><p className="text-[10px] opacity-60">Automated • +3.8% WoW</p></div>
        </div>
        <div className="border border-[#b4ff39] rounded mt-3 p-3 grid grid-cols-2 gap-4">
          <div className="text-[11px]"><p>🕒 Float Profit 29d</p><div className="mt-2 space-y-1"><div className="bg-white/10 flex justify-between p-1"><span>Charge Day 1</span><span>2024-09-01</span></div><div className="bg-white/5 flex justify-between p-1"><span>Pay Day 30</span><span>2024-09-30</span></div><div className="bg-white/10 flex justify-between p-1"><span>29-Day Float</span><span>29 Days</span></div><div className="bg-white/5 flex justify-between p-1"><span>Interest APY</span><span>4.5%</span></div></div></div>
          <div className="text-[11px]"><p className="opacity-50">CALCULATION</p><p className="bg-[#b4ff39]/20 p-2 mt-1 font-bold">{totalTB} TB × $4.75 = ${(Number(totalTB)*4.75).toFixed(0)} held for 29 days</p><div className="flex gap-[2px] mt-2 h-6 items-end">{Array.from({length:20}).map((_,i)=><div key={i} className="bg-[#b4ff39] w-full" style={{height:`${20+i*3}%`}}/>)}</div></div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="border border-white/10 p-3 rounded text-[11px]"><p>🌐 Global Nodes</p><p className="mt-2">● Frankfurt • EU-01 • Active - {totalTB} TB</p><p>● Singapore • APAC-02 • Active</p><p>● Texas • US-SW-03 • Active</p></div>
          <div className="border border-white/10 p-3 rounded text-[11px]"><p>📊 System Overview</p><div className="h-12 mt-2 border-l border-b border-[#b4ff39]/20"><svg viewBox="0 0 100 30" className="w-full h-full"><path d="M0 25 L20 20 L40 15 L60 10 L80 12 L100 2" fill="none" stroke="#b4ff39" strokeWidth="1"/></svg></div></div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
