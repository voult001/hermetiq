"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function Page() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      alert(error.message)
    } else {
      router.push("/store")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      <div className="mb-6 text-[#39FF14] font-black text-xl tracking-widest">VAULTBNB</div>
      <div className="w-full max-w-sm border border-white/10 rounded-2xl p-6 bg-white/5">
        <h1 className="text-2xl font-bold text-white">Welcome back</h1>
        <p className="text-sm opacity-60 mb-6 mt-1 text-white">Sign in to your vault</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" className="w-full h-12 px-4 rounded-xl bg-black border border-white/20 text-white" />
          <input type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full h-12 px-4 rounded-xl bg-black border border-white/20 text-white" />
          <button type="submit" disabled={loading} className="w-full h-12 rounded-xl bg-[#39FF14] text-black font-bold">
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>
        <p className="text-xs opacity-50 mt-4 text-center text-white">
          No account? <Link href="/signup" className="text-[#39FF14] underline">Create Vault</Link>
        </p>
      </div>
    </div>
  )
}
