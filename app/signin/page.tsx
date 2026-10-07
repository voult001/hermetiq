export const dynamic = 'force-dynamic'

"use client"
import { useState, Suspense } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

function SignInContent(){
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if(error){
      alert(error.message)
      setLoading(false)
      return
    }

    // --- TU FILTRO OBLIGATORIO JEFE ---
    const userEmail = data.user?.email || email
    
    // 1. ¿Es cliente viejo? Identificar por email como pediste
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

    // 2. ¿Viene de la tarjeta de AFUERA? Respetar lo que clicó afuera
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

    // 3. Si entró por Sign In genérico de arriba -> ADENTRO le toca choose-role
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

export default function SignInPage(){
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-zinc-600">Loading vault...</div>}>
      <SignInContent />
    </Suspense>
  )
}
