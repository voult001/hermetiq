export const dynamic = 'force-dynamic'

"use client"
import { useState, Suspense } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function AuthContent() {
  const [mode, setMode] = useState<"signin" | "signup">("signup")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

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
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        
        const role = searchParams.get('role')
        const from = searchParams.get('from')
        if(from === 'card' && role && data.user){
          try {
            await supabase.from('profiles').insert({ 
              id: data.user.id, 
              email: email, 
              role: role
            })
          } catch {}
        }

        alert("Cuenta creada! Revisa info@sigilluq.com")
        const r = searchParams.get('role')
        const f = searchParams.get('from')
        if(f === 'card' && r){
          router.push(`/signin?role=${r}&from=card`)
        } else {
          setMode("signin")
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error

        const userEmail = data.user?.email || email
        
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('email', userEmail)
            .maybeSingle()

          if(profile?.role === 'host'){
            router.push("/host")
            return
          }
          if(profile?.role === 'guest' || profile?.role === 'store' || profile?.role === 'silo'){
            router.push("/store")
            return
          }
        } catch {}

        const role = searchParams.get('role')
        const from = searchParams.get('from')

        if(from === 'card' && role === 'host'){
          router.push("/host")
          return
        }
        if(from === 'card' && role === 'guest'){
          router.push("/store")
          return
        }

        router.push("/choose-role")
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

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-zinc-600">Loading vault...</div>}>
      <AuthContent />
    </Suspense>
  )
}
