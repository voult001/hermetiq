"use client"
import { useState } from "react"
export default function Pricing(){
  const [loading,setLoading]=useState("")
  async function goStripe(plan:string){
    setLoading(plan)
    try{
      const r=await fetch("/api/checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({plan})})
      const d=await r.json()
      if(d?.url) window.location.href=d.url
      else alert(d?.error)
    }catch{alert("API not ready")}
    setLoading("")
  }
  return(
    <section className="w-full bg-[#070a07] py-20 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="rounded-[20px] bg-[#111a11] border border-[#39ff6a] p-8">
          <h3 className="text-white font-bold text-xl">Hosts</h3>
          <p className="text-white font-mono text-3xl font-bold mt-6">50GB - 2TB</p>
          <button onClick={()=>goStripe("host")} className="mt-8 w-full h-12 rounded-full bg-[#39ff6a] text-black font-bold">{loading==="host"?"Loading...":"Become a Host"}</button>
        </div>
        <div className="rounded-[20px] bg-[#111] border border-white/15 p-8">
          <h3 className="text-white font-bold text-xl">Guests</h3>
          <p className="text-white font-mono text-3xl font-bold mt-6">Pay As You Go</p>
          <button onClick={()=>goStripe("guest")} className="mt-8 w-full h-12 rounded-full bg-white text-black font-bold">{loading==="guest"?"Loading...":"Start Storing"}</button>
        </div>
      </div>
    </section>
  )
}
