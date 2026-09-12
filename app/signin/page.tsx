"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async (e: any) => {
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
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-sm border border-white/10 rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
        <p className="text-sm opacity-60 font-mono mb-6">Sign in to your VaultBNB account</p>
        
        <form onSubmit={handleSignIn} className="space-y-4">
          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-white/5 border-white/10" />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-white/5 border-white/10" />
          <Button type="submit" disabled={loading} className="w-full bg-[#39FF14] text-black font-bold rounded-full">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-xs font-mono opacity-50 mt-4 text-center">
          No account? <Link href="/signup" className="text-[#39FF14] underline">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}
