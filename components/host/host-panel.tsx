"use client"
import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { CircularProgress } from "./circular-progress"
import { createClient } from "@supabase/supabase-js"
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export function HostPanel(){
  const [share,setShare]=useState(500)
  const [freeGB,setFreeGB]=useState(0)
  const [loading,setLoading]=useState(true)
  const [saving,setSaving]=useState(false)
  const monthly=share*0.0248
  const yearly=monthly*12
  useEffect(()=>{(async()=>{
    const {data}=await supabase.from('hosts').select('freeGB').order('created_at',{ascending:false}).limit(1)
    if(data?.[0]) setFreeGB(Number(data[0].freeGB))
    setLoading(false)
  })()},[])
  async function start(){
    setSaving(true)
    const {error}=await supabase.from('hosts').insert({freeGB:share,speedMbps:100,pingMs:22,online:true,lat:26.6+Math.random(),lng:-80.1+Math.random()})
    if(error) alert(error.message)
    else { setFreeGB(share); alert(`${share}GB saved to Supabase!`) }
    setSaving(false)
  }
  return (
    <div className="flex flex-col gap-7 p-8">
      <h1 className="text-2xl font-bold text-white">Rent your spare drive. <span className="text-[#00ff88]">Earn $500/TB/year.</span></h1>
      <CircularProgress used={70} freeLabel={loading?"Loading...":`${freeGB.toFixed(1)} GB`} />
      <div className="space-y-3">
        <div className="flex justify-between"><span className="text-xs text-white/60">SHARE</span><span className="text-white font-bold">{share>=1000?`${(share/1000).toFixed(1)}TB`:`${share}GB`}</span></div>
        <Slider value={[share]} min={10} max={2000} step={10} onValueChange={v=>setShare(v[0])} />
      </div>
      <div className="rounded-lg bg-white/5 border border-white/10 p-3"><p className="text-sm text-white">Estimated: ${monthly.toFixed(2)}/mo | <span className="text-[#00ff88]">${yearly.toFixed(0)}/yr</span></p></div>
      <button onClick={start} disabled={saving} className="w-full rounded-xl bg-[#00ff88] py-3.5 font-bold text-black">{saving?"Saving...":"Start Earning - Become a Vault"}</button>
      <p className="text-center text-[10px] text-white/30">Live: voult-v2 → hosts</p>
    </div>
  )
}
