"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function AdminPage(){
  const [users,setUsers]=useState<any[]>([])
  const [totalGB,setTotalGB]=useState(0)
  const [time,setTime]=useState("00:00:00")
  const [ok,setOk]=useState(false)
  const router = useRouter()

  useEffect(()=>{
    const check = async ()=>{
      const { data: { user } } = await supabase.auth.getUser()
      if(!user || user.email!== "info@sigilluq.com"){
        router.push("/dashboard")
        return
      }
      setOk(true)
      const { data: profiles } = await supabase.from("profiles").select("*")
      if(profiles) setUsers(profiles)
      const { data: files } = await supabase.from("files").select("size")
      if(files){
        const total = files.reduce((a:any,b:any)=>a+(b.size||0),0)
        setTotalGB(total / (1024*1024*1024))
      }
    }
    check()
    const i = setInterval(()=> setTime(new Date().toLocaleTimeString('en-GB',{hour12:false})),1000)
    return ()=> clearInterval(i)
  },[])

  if(!ok) return <div className="min-h-screen bg-black text-[#b4ff39] p-10 font-mono">Verificando ROOT access para info@sigilluq.com...</div>

  const totalTB = totalGB / 1024
  const profitPerTB = 9.99 - 4.75

  return(
    <div className="min-h-screen bg-black text-[#b4ff39] font-mono">
      <SiteHeader />
      <main className="container mx-auto px-6 py-6 max-w-6xl">
        <div className="flex justify-between text-[11px] border-b border-[#b4ff39]/20 pb-2">
          <span className="font-black text-lg">SIGILLIUQ v2.5 • ADMIN</span>
          <span className="flex gap-4"><span className="text-green-400">● ONLINE</span><span>UTC {time}</span><span>ROOT</span></span>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="border border-[#b4ff39]/20 p-4 rounded"><p className="text-[10px]">COSTO</p><p className="text-4xl font-black">$4.75<span className="text-sm">/TB</span></p></div>
          <div className="border border-white/20 p-4 rounded"><p className="text-[10px]">PRECIO</p><p className="text-4xl font-black">$9.99<span className="text-sm">/TB</span></p></div>
          <div className="border border-[#b4ff39] p-4 rounded"><p className="text-[10px]">PROFIT</p><p className="text-4xl font-black">${profitPerTB.toFixed(2)}<span className="text-sm">/TB</span></p><p className="text-[10px] mt-1 opacity-60">{totalTB.toFixed(3)} TB = ${(totalTB*profitPerTB).toFixed(2)} /mes</p></div>
        </div>

        <div className="border border-[#b4ff39]/30 rounded mt-6 p-4">
          <p className="text-xs font-bold">Usuarios Reales: {users.length} | Storage Total: {totalTB.toFixed(4)} TB ({totalGB.toFixed(2)} GB)</p>
          <div className="mt-3 max-h-[300px] overflow-auto border border-white/10 rounded">
            {users.map((u:any)=>(
              <div key={u.id} className="flex justify-between p-2 border-b border-white/5 text-[11px]">
                <span>{u.email}</span>
                <span>{u.id.slice(0,8)}</span>
              </div>
            ))}
            {users.length===0 && <p className="p-3 text-[11px] opacity-50">No hay usuarios en profiles todavía</p>}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
