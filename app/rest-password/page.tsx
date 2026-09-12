"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [done, setDone] = useState(false)
  const router = useRouter()

  const updatePassword = async () => {
    const { error } = await supabase.auth.updateUser({ password })
    if (!error) {
      setDone(true)
      setTimeout(()=> router.push("/dashboard"), 2000)
    } else {
      alert(error.message)
    }
  }

  return (
    <div style={{padding:40, maxWidth:400, margin:"0 auto"}}>
      <h1 style={{fontSize:24, fontWeight:"bold"}}>Set New Password</h1>
      {!done ? (
        <>
          <input 
            type="password"
            placeholder="New password" 
            value={password} 
            onChange={e=>setPassword(e.target.value)}
            style={{width:"100%", padding:12, margin:"20px 0", border:"1px solid #ccc", borderRadius:8}}
          />
          <button onClick={updatePassword} style={{width:"100%", padding:12, background:"black", color:"#00FF88", borderRadius:8, cursor:"pointer"}}>
            Update Password
          </button>
        </>
      ) : (
        <p style={{color:"green", marginTop:20}}>✅ Password updated! Redirecting...</p>
      )}
    </div>
  )
}
