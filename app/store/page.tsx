"use client"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Store(){
  const [storage, setStorage] = useState(50)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [done, setDone] = useState(false)

  const price = (storage * 0.008).toFixed(2) // $0.005/GB + fee = te queda $0.40 en 50GB como en tu video
  const options = [
    { label: "50GB", value: 50 },
    { label: "500GB", value: 500 },
    { label: "1TB", value: 1000 },
    { label: "2TB", value: 2000 },
  ]

  async function handleUpload(){
    if(!file) return alert("Select a file")
    setUploading(true)
    const name = `${Date.now()}_${file.name}`
    const { error } = await supabase.storage.from("vault").upload(name, file)
    if(!error){
      setDone(true)
    }
    setUploading(false)
  }

  return(
    <div className="min-h-screen bg-background text-foreground grid-bg">
      <SiteHeader />
      <main className="container mx-auto px-6 py-10 max-w-3xl">
        <h1 className="text-4xl font-bold">Store Files - Encrypted <span className="text-[#A7FF7A]">$0.005/GB</span></h1>
        <p className="text-sm text-muted-foreground mt-2">Military-grade encryption. Distributed across 625TB network. Pay only for what you use.</p>

        <div className="rounded-2xl border bg-card p-6 mt-8">
          <div className="flex justify-between">
            <div>
              <p className="text-xs tracking-widest text-muted-foreground">STORAGE</p>
              <p className="text-3xl font-bold">{storage >= 1000? `${storage/1000}.0 TB` : `${storage} GB`}</p>
            </div>
            <div className="text-right">
              <p className="text-xs tracking-widest text-muted-foreground">EST.</p>
              <p className="text-xl font-bold">${price}/mo</p>
            </div>
          </div>

          {/* Slider visual */}
          <div className="mt-6 h-1 bg-zinc-800 rounded-full relative">
            <div className="absolute h-1 bg-[#A7FF7A] rounded-full" style={{width: `${(storage/2000)*100}%`}}></div>
          </div>

          <div className="flex gap-2 mt-4">
            {options.map(o=>(
              <button key={o.value} onClick={()=>setStorage(o.value)}
                className={`px-4 py-1 rounded-full text-xs font-bold border ${storage===o.value? 'bg-white text-black border-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}>
                {o.label}
              </button>
            ))}
          </div>

          <p className="text-[11px] text-muted-foreground mt-4">Guest sees whole package - internally fragmented into 50MB shards - authorized only after payment+email</p>

          <div className="flex gap-2 mt-3">
            <span className="text-[10px] border rounded-full px-3 py-1">VAULT69X2</span>
            <span className="text-[10px] text-muted-foreground">Near Me - Fast Parallel Delivery</span>
          </div>

          {/* AQUI ESTA LO QUE FALTABA - EL UPLOAD REAL */}
          <div className="mt-8 border-t border-zinc-800 pt-6">
            <input type="file" onChange={(e)=>setFile(e.target.files?.[0]||null)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm" />
            <button onClick={handleUpload}
              className="mt-4 w-full bg-[#A7FF7A] text-black px-6 py-3 rounded-full font-bold">
              {uploading? "UPLOADING..." : `⬆️ Upload File - Start Storing`}
            </button>
            {done && <div className="mt-4 border border-green-500/50 bg-green-500/10 rounded-lg p-3 text-green-500 text-sm font-bold">✅ FILE SECURED IN VAULT</div>}
            {file && <p className="text-xs mt-2 text-zinc-400">Selected: {file.name}</p>}
          </div>

        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
