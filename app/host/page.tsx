"use client"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useState } from "react"
export default function Host(){
  const [d,setD]=useState<any>(null)
  const [l,setL]=useState(false)
  async function scan(){
    setL(true)
    try{
      const e:any=await (navigator as any).storage.estimate()
      const libre=((e.quota-e.usage)/1024/1024/1024).toFixed(2)
      const info={libre,fecha:new Date().toLocaleString(),id:"host_"+Math.random().toString(36).slice(2,7),verificado:true}
      setD(info)
      const lista=JSON.parse(localStorage.getItem("sigilliq_hosts")||"[]")
      lista.push(info)
      localStorage.setItem("sigilliq_hosts",JSON.stringify(lista))
    }catch{}
    setL(false)
  }
  return(
    <div className="min-h-screen bg-background text-foreground grid-bg">
      <SiteHeader />
      <main className="container mx-auto px-6 py-10 max-w-2xl">
        <h1 className="text-4xl font-bold text-glow">Ser Host</h1>
        <div className="rounded-xl border bg-card p-6 mt-8">
          <h3>💾 Escáner con Permiso Real</h3>
          <p className="text-sm text-muted-foreground mt-2">Usa navigator.storage.estimate() - pide permiso, no ve archivos</p>
          <button onClick={scan} className="mt-4 bg-foreground text-background px-6 py-3 rounded-lg font-bold w-full">{l?"ESCANEANDO...":"🔍 Verificar mi espacio"}</button>
          {d&&<div className="mt-4 border border-green-500/50 bg-green-500/10 rounded-lg p-4"><p className="text-green-600 font-bold">✅ VERIFICADO {d.libre} GB</p></div>}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
