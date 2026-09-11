"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [pass2, setPass2] = useState("")
  const router = useRouter()

  const createAccount = () => {
    if (!email.includes("@")) return alert("Enter valid email")
    if (pass.length < 6) return alert("Password must be 6+ chars")
    if (pass !== pass2) return alert("Passwords don't match")
    localStorage.setItem("vault_user", email)
    localStorage.setItem("vault_pass", pass)
    router.push("/host")
  }

  return (
    <div style={{minHeight:"100vh", background:"#0A0F0A", color:"white", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:21}}>
      <Link href="/" style={{fontFamily:"monospace", color:"#39FF14", fontSize:13, marginBottom:34, fontWeight:"bold"}}>VAULTBNB</Link>
      <div style={{width:"100%", maxWidth:400, border:"1px solid rgba(255,255,255,0.1)", borderRadius:21, padding:34, background:"#0F1A0F"}}>
        <h1 style={{fontSize:24, fontWeight:"bold"}}>Create your Vault</h1>
        <p style={{fontFamily:"monospace", fontSize:13, opacity:0.6, marginTop:8, marginBottom:21}}>Share storage. Earn monthly.</p>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" style={{width:"100%", background:"black", border:"1px solid rgba(255,255,255,0.1)", borderRadius:13, padding:16, marginBottom:13, color:"white"}} />
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Create password (6+ chars)" style={{width:"100%", background:"black", border:"1px solid rgba(255,255,255,0.1)", borderRadius:13, padding:16, marginBottom:13, color:"white"}} />
        <input type="password" value={pass2} onChange={e=>setPass2(e.target.value)} placeholder="Confirm password" style={{width:"100%", background:"black", border:"1px solid rgba(255,255,255,0.1)", borderRadius:13, padding:16, marginBottom:21, color:"white"}} />
        <button onClick={createAccount} style={{width:"100%", background:"#39FF14", color:"black", padding:16, borderRadius:13, fontWeight:"bold", fontFamily:"monospace"}}>Create Vault →</button>
        <div style={{textAlign:"center", marginTop:21, fontFamily:"monospace", fontSize:12, opacity:0.6}}>Already have vault? <Link href="/signin" style={{color:"#39FF14"}}>Sign in</Link></div>
      </div>
    </div>
  )
}
