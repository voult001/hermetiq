"use client"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function SignInPage(){
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if(error){
      alert(error.message)
      setLoading(false)
      return
    }
    router.push("/choose-role")
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-[#111] border border-[#39FF14]/20 rounded-2xl p-6">
        <h1 className="text-white text-xl font-bold">Welcome back</h1>
        <p className="text-zinc-500 text-sm mb-6">Sign in to your vault</p>
        <form onSubmit={handleSignIn} className="space-y-4">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white" required />
          <div className="relative">
            <input type={showPassword ? "text" : "password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full p-3 pr-12 bg-zinc-900 border border-zinc-800 rounded-lg text-white" required />
            <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">
              {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
            </button>
          </div>
          <button type="submit" disabled={loading} className="w-full p-3 bg-[#39FF14] text-black font-bold rounded-lg">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  )
}
