"use client"
import { useState, useRef } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { supabase } from "@/lib/supabase"

export default function Store(){
  const [storage, setStorage] = useState(50)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [done, setDone] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const price = (storage * 0.008).toFixed(2)
  const GREEN = "#A7FF7A" // TU VERDE ORIGINAL - NO LO TOCO MAS

  function pickFile(){ inputRef.current?.click() }

  async function handleUpload(){
    if(!file){ pickFile(); return }
    setUploading(true)
    const name = `${Date.now()}_${file.name}`
    const { error } = await supabase.storage.from("vault").upload(name, file)
    setUploading(false)
    if(error){ alert(error.message); return }
    setDone(true)
  }

  return(
    <div className="min-h-screen bg-background text-foreground grid-bg">
      <SiteHeader />
      <main className="container mx-auto px-6 py-10 max-w-3xl">
        <h1 className="text-4xl font-bold">Store Files - Encrypted <span style={{color:GREEN}}>$0.005/GB</span></h1>
        <p className="text-sm text-muted-foreground mt-2">Military-grade encryption. Distributed across 625TB network. Pay only for what you use.</p>

        <div className="rounded-2xl border bg-card p-6 mt-8">
          <div className="flex justify-between">
            <div><p className="text-xs tracking-widest text-muted-foreground">STORAGE</p><p className="text-3xl font-bold">{storage>=1000? `${storage/1000} TB` : `${storage} GB`}</p></div>
            <div className="text-right"><p className="text-xs text-muted-foreground">EST.</p><p className="text-xl font-bold">${price}/mo</p></div>
          </div>

          <div className="flex gap-2 mt-4">
            {[50,500,1000,2000].map(v=>(
              <button key={v} onClick={()=>setStorage(v)} className={`px-4 py-1 rounded-full text-xs font-bold border ${storage===v?'bg-white text-black border-white':'bg-zinc-900 border-zinc-800 text-zinc-400'}`}>{v>=1000? `${v/1000}TB` : `${v}GB`}</button>
            ))}
          </div>

          <input ref={inputRef} type="file" hidden onChange={(e)=>{ setFile(e.target.files?.[0]||null); setDone(false) }} />

          <div className="mt-8 border-t border-zinc-800 pt-6">
            <button onClick={pickFile} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm text-left">{file? `📄 ${file.name}` : "Choose File No file chosen"}</button>

            <button onClick={handleUpload} style={{backgroundColor:GREEN}} className="mt-3 w-full text-black px-6 py-4 rounded-full font-bold">
              {uploading? "UPLOADING..." : file? `⬆️ Upload File - Start Storing` : "📂 Choose File - Open Documents"}
            </button>

            {done && <div className="mt-4 border border-green-500/50 bg-green-500/10 rounded-lg p-3 text-green-500 text-sm font-bold text-center">✅ FILE SECURED IN VAULT</div>}
          </div>
          <p className="text-[10px] text-center text-muted-foreground mt-3">U.S. Pat. App. No. 64/153,968 - Patent Pending</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
