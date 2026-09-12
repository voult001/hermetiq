"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSignIn() {
    setErr("")
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setErr(error.message)
      return
    }
    router.push("/store")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-sm text-zinc-400">Sign in to Vault</p>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-3 rounded bg-zinc-900 border border-zinc-800" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full p-3 rounded bg-zinc-900 border border-zinc-800" />
        {err && <p className="text-red-500 text-sm">{err}</p>}
        <button onClick={handleSignIn} disabled={loading} className="w-full bg-white text-black p-3 rounded font-semibold">
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <a href="/signup" className="text-sm text-zinc-400 block text-center">Need account? Sign up</a>
      </div>
    </div>
  )
}
