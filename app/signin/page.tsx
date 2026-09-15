"use client"
import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get("next") || "/store"

  async function handleSignIn() {
    setErr("")
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setErr(error.message)
      return
    }
    router.push(next)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-sm text-zinc-400">Sign in to Vault - will go to {next}</p>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white" />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white" />
        {err && <p className="text-sm text-red-400">{err}</p>}
        <button onClick={handleSignIn} disabled={loading} className="w-full p-3 bg-[#39FF14] text-black font-bold rounded-lg">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <SignInForm />
    </Suspense>
  )
}
