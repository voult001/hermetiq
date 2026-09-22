"use client"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signup")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const inputClass = "w-full p-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#39FF14]"

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === "signup" && password !== confirm) {
      alert("Passwords don't match")
      return
    }
    setLoading(true)
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        alert("Cuenta creada! Revisa info@sigilluq.com")
        setMode("signin")
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.push("/")
      }
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <form onSubmit={handleAuth} className="w-full max-w-sm">
        <h2 className="text-white text-xl font-bold">{mode==="signin" ? "Welcome back" : "Create account"}</h2>
        <p className="text-zinc-400 text-sm mb-6">{mode==="signin" ? "Sign in to your vault" : "Join your vault"}</p>

        <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete="off" className={`${inputClass} mb-3`} required />

        <div className="relative mb-3">
          <input type={showPassword ? "text" : "password"} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" autoComplete="new-password" className={inputClass} required />
          <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white">
            {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
          </button>
        </div>

        {mode==="signup" && (
          <div className="relative mb-4">
            <input type={showConfirm ? "text" : "password"} value={confirm} onChange={(e)=>setConfirm(e.target.value)} placeholder="Confirm password" autoComplete="new-password" className={inputClass} required />
            <button type="button" onClick={()=>setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white">
              {showConfirm ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
            </button>
          </div>
        )}

        <button disabled={loading} className="w-full p-3 bg-[#39FF14] text-black font-bold rounded-xl hover:bg-[#32e612] disabled:opacity-50">
          {loading ? "Loading..." : mode==="signin" ? "Sign In" : "Sign Up"}
        </button>

        <style>{`
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 1000px #18181b inset !important;
            -webkit-text-fill-color: white !important;
            caret-color: white !important;
            transition: background-color 5000s ease-in-out 0s;
          }
        `}</style>
      </form>
    </div>
  )
}
