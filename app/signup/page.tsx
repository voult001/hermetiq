"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const [mode, setMode] = useState<"up"|"in">("up")
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [pass2, setPass2] = useState("")
  const router = useRouter()

  const handleUp = () => {
    if (!email.includes("@")) return alert("Enter valid email")
    if (pass.length < 6) return alert("Password 6+ chars")
    if (pass !== pass2) return alert("Passwords don't match")
    localStorage.setItem("vault_user", email)
    localStorage.setItem("vault_pass", pass)
    router.push("/host")
  }

  const handleIn = () => {
    const savedEmail = localStorage.getItem("vault_user")
    const savedPass = localStorage.getItem("vault_pass")
    if (email === savedEmail && pass === savedPass) {
      router.push("/dashboard")
    } else {
      alert("Wrong email or password. Try again or Sign Up.")
    }
  }

  return (
    <div style={{minHeight:"100vh", background:"#0A0F0A", color:"white", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:21}}>
      <Link href="/" style={{fontFamily:"monospace", color:"#39FF14", fontSize:13, marginBottom:21, fontWeight:"bold"}}>VAULTBNB</Link>
      
      <div style={{display:"flex", gap:8, marginBottom:21, background:"#0F1A0F", padding:4, borderRadius:13, border:"1px solid rgba(255,255,255,0.1)"}}>
        <button onClick={()=>setMode("up")} style={{padding:"8px 21px", borderRadius:10, background: mode==="up" ? "#39FF14" : "transparent", color: mode==="up" ? "black" : "white", fontFamily:"monospace", fontWeight:"bold", fontSize:13}}>Sign Up</button>
        <button onClick={()=>setMode("in")} style={{padding:"8px 21px", borderRadius:10, background: mode==="in" ? "#39FF14" : "transparent", color: mode==="in" ? "black" : "white", fontFamily:"monospace", fontWeight:"bold", fontSize:13}}>Sign In</button>
      </div>

      <div style={{width:"100%", maxWidth:400, border:"1px solid rgba(255,255,255,0.1)", borderRadius:21, padding:34, background:"#0F1A0F"}}>
        <h1 style={{fontSize:24, fontWeight:"bold"}}>{mode==="up" ? "Create your Vault" : "Welcome back"}</h1>
        <p style={{fontFamily:"monospace", fontSize:13, opacity:0.6, marginTop:8, marginBottom:21}}>{mode==="up" ? "Share storage. Earn monthly." : "Sign in to your vault"}</p>
        
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" style={{width:"100%", background:"black", border:"1px solid rgba(255,255,255,0.1)", borderRadius:13, padding:16, marginBottom:13, color:"white"}} />
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder={mode==="up" ? "Create password (6+ chars)" : "Password"} style={{width:"100%", background:"black", border:"1px solid rgba(255,255,255,0.1)", borderRadius:13, padding:16, marginBottom: mode==="up" ? 13 : 21, color:"white"}} />
        {mode==="up" && <input type="password" value={pass2} onChange={e=>setPass2(e.target.value)} placeholder="Confirm password" style={{width:"100%", background:"black", border:"1px solid rgba(255,255,255,0.1)", borderRadius:13, padding:16, marginBottom:21, color:"white"}} />}
        
        <button onClick={mode==="up" ? handleUp : handleIn} style={{width:"100%", background:"#39FF14", color:"black", padding:16, borderRadius:13, fontWeight:"bold", fontFamily:"monospace"}}>{mode==="up" ? "Create Vault →" : "Sign In →"}</button>
        
        <Link href="/passcode" style={{display:"block", textAlign:"center", marginTop:16, fontFamily:"monospace", fontSize:12, color:"#39FF14", opacity:0.8}}>Use Passcode (easy sign in)</Link>
      </div>
    </div>
  )
}
