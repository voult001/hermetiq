"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const handleReset = async () => {
    setError("")
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) setError(error.message)
    else setSent(true)
  }

  return (
    <div style={{padding:40, maxWidth:400, margin:"0 auto"}}>
      <h1 style={{fontSize:24, fontWeight:"bold"}}>Forgot Password</h1>
      {!sent ? (
        <>
          <input 
            placeholder="Enter your email" 
            value={email} 
            onChange={e=>setEmail(e.target.value)}
            style={{width:"100%", padding:12, margin:"20px 0", border:"1px solid #ccc", borderRadius:8}}
          />
          <button onClick={handleReset} style={{width:"100%", padding:12, background:"black", color:"#00FF88", borderRadius:8, cursor:"pointer"}}>
            Send Reset Link
          </button>
          {error && <p style={{color:"red", marginTop:10}}>{error}</p>}
        </>
      ) : (
        <p style={{marginTop:20, color:"green"}}>✅ Check your email! Reset link sent to {email}</p>
      )}
      <a href="/signin" style={{display:"block", marginTop:20}}>← Back to Sign In</a>
    </div>
  )
}
