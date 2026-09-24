"use client"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function Admin(){
  const [hosts,setHosts]=useState<any[]>([])
  const [users,setUsers]=useState<any[]>([])
  const [totalGB,setTotalGB]=useState(0)
  const [time,setTime]=useState("14:32:09")
  const [loading,setLoading]=useState(true)
  const router = useRouter()

  useEffect(()=>{
    const init = async () => {
      // 1. Seguridad - solo tu correo
      const { data: { user } } = await supabase.auth.getUser()
      if(!user || user.email!== "info@sigilluq.com"){
        router.push("/dashboard")
        return
      }

      // 2. Datos reales de Supabase
      // Usuarios (profiles)
      const { data: profiles } = await supabase.from("profiles").select("*")
      if(profiles) setUsers(profiles)

      // Archivos para calcular almacenamiento total
      const { data: files } = await supabase.from("files").select("size")
      if(files){
        const totalBytes = files.reduce((a:any,b:any)=>a + (b.size||0),0)
        setTotalGB(totalBytes / (1024*1024*1024))
      }

      // Hosts (si tenes tabla hosts, si no usa localStorage como fallback)
      const { data: hostsData } = await supabase.from("hosts").select("*")
      if(hostsData && hostsData.length > 0){
        setHosts(hostsData)
      } else {
        setHosts(JSON.parse(localStorage.getItem("sigilliuq_hosts")||"[]"))
      }

      setLoading(false)
    }
    init()
    setInterval(()=>setTime(new Date().toLocaleTimeString('en-GB',{hour12:false})),1000)
  },[])

  const totalTB = (totalGB / 1024).toFixed(2)
  const inputCost = 4.75 // lo que pagas por TB
  const outputPrice = 9.99 // lo que cobras por TB
  const profitPerTB = outputPrice - inputCost
  const monthlyRevenue = (Number(totalTB) * outputPrice).toFixed(2)
  const monthlyProfit = (Number(totalTB) * profitPerTB).toFixed(2)

  if(loading) return <div className="min-h-screen bg-black text-[#b4ff39] p-6">Verificando ROOT access...</div>

  return(
    <div className="min-h-screen bg-black text-[#b4ff39] font-mono">
      <SiteHeader />
      <main className="container mx-auto px-6 py-4 max-w-6xl">
        <div className="flex justify-between text-[11px] tracking-widest border-b border-[#b4ff39]/20 pb-2">
          <span className="font-black text-lg">SIGILLIUQ <span className="opacity-50 text-[10px]">v2.5 • ADMIN DASHBOARD</span></span>
          <span className="flex gap-3"><span className="text-green-400">● SYSTEM ONLINE</span><span>UTC {time}</span><span>ADMIN • ROOT</span></span>
        </div>

        <h2 className="mt-4 font-bold">Profit Metrics</h2>
        <div className="grid grid-cols-3 gap-3 mt-2">
          <div className="border border-[#b4ff39]/10 p-4 rounded"><p className="text-[10px]">Input</p><p className="text-4xl font-black">${inputCost}<span className="text-sm">/TB</span></p><p className="text-[10px] opacity-50">Costo Host</p></div>
          <div className="border border-white/20 p-4 rounded"><p className="text-[10px]">Output</p><p className="text-4xl font-black">${outputPrice}<span className="text-sm">/TB</span></p><p className="text-[10px] opacity-50">Precio Cliente</p></div>
          <div className="border border-white/20 p-4 rounded"><p className="text-[10px]">Auto Profit</p><p className="text-4xl font-black">${profitPerTB}<span className="text-sm">/TB</span></p><p className="text-[10px] opacity-50">{totalTB} TB x ${profitPerTB} = ${monthlyProfit}</p></div>
        </div>

        <div className="border border-[#b4ff39] rounded mt-3 p-3 grid grid-cols-2 gap-4">
          <div className="text-[11px]"><p>Float Profit 29d</p><div className="mt-2 space-y-1"><div className="bg-white/10 flex justify-between p-1"><span>Charge Day 1</span><span>2024-09-01</span></div>
          <p className="bg-[#b4ff39]/20 p-2 mt-1 font-bold">{totalTB} TB × $4.75 = ${(Number(totalTB)*4.75).toFixed(0)} held for 29 days</p><p className="opacity-50">CALCULATION</p></div></div>
          <div className="text-[11px]">
            <p>Usuarios: {users.length} | Storage: {totalTB} TB | Revenue/mes: ${monthlyRevenue}</p>
            <div className="mt-2 border border-white/10 p-2 rounded max-h-32 overflow-auto">
              {users.map((u:any)=>(
                <div key={u.id} className="flex justify-between border-b border-white/5 py-1">
                  <span>{u.email || u.id.slice(0,8)}</span>
                  <span>{u.storage_used? (u.storage_used/1024/1024/1024).toFixed(2)+' GB' : '0 GB'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="border border-white/10 p-3 rounded text-[11px]"><p>Global Nodes</p><p className="mt-2">• Frankfurt • EU-01 • Active - {totalTB} TB</p><p>• Singapore • APAC-02 • Active</p><p>• Texas • US-01 • Active</p></div>
          <div className="border border-white/10 p-3 rounded text-[11px]"><p>System Overview</p><div className="h-12 mt-2 border-l border-b border-[#b4ff39]/20"></div></div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
