"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handle = () => {
    if(!email.includes("@")) return alert("Enter valid email")
    setLoading(true)
    localStorage.setItem("vault_user", email)
    setTimeout(()=> router.push("/host"), 600)
  }

  return (
    <div style={{minHeight:"100vh", background:"#0A0F0A", color:"white", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:21}}>
      <Link href="/" style={{fontFamily:"monospace", color:"#39FF14", fontSize:13, marginBottom:34}}>← VAULTBNB</Link>
      <div style={{width:"100%", maxWidth:400, border:"1px solid rgba(255,255,255,0.1)", borderRadius:21, padding:34, background:"#0F1A0F"}}>
        <h1 style={{fontSize:24, fontWeight:"bold"}}>Create your Vault</h1>
        <p style={{fontFamily:"monospace", fontSize:13, opacity:0.6, marginTop:8, marginBottom:21}}>Share storage. Earn monthly.</p>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" style={{width:"100%", background:"black", border:"1px solid rgba(255,255,255,0.1)", borderRadius:13, padding:16, marginBottom:13, color:"white"}} />
        <button onClick={handle} disabled={loading} style={{width:"100%", background:"#39FF14", color:"black", padding:16, borderRadius:13, fontWeight:"bold", fontFamily:"monospace"}}>
          {loading? "Creating...":"Continue →"}
        </button>
      </div>
    </div>
  )
}
