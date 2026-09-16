"use client"
import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Eye, EyeOff } from "lucide-react"

function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get("next") || "/store"

  async function handleSignIn() {
    setErr("")
    setResetSent(false)
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setErr(error.message)
      return
    }
    router.push(next)
  }

  async function handleForgot() {
    if (!email) {
      setErr("Enter your email first to recover password")
      return
    }
    setErr("")
    setResetSent(false)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    if (error) setErr(error.message)
    else setResetSent(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        
        <input 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)} 
          placeholder="Email" 
          className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white" 
        />
        
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)} 
            placeholder="Password" 
            className="w-full p-3 pr-12 bg-zinc-900 border border-zinc-700 rounded-lg text-white" 
          />
          <button 
            type="button" 
            onClick={()=>setShowPassword(!showPassword)} 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white z-10 p-1"
          >
            {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
          </button>
        </div>

        <div className="flex justify-end">
          <button onClick={handleForgot} type="button" className="text-sm text-zinc-400 hover:text-[#39FF14] underline">
            Forgot password?
          </button>
        </div>

        {err && <p className="text-sm text-red-400">{err}</p>}
        {resetSent && <p className="text-sm text-[#39FF14]">Recovery email sent to {email}</p>}
        
        <button onClick={handleSignIn} disabled={loading} className="w-full p-3 bg-[#39FF14] text-black font-bold rounded-lg">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
      <SignInForm />
    </Suspense>
  )
}
