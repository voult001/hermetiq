"use client"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AuthPage(){
  const [mode, setMode] = useState<"signin" | "signup">("signup")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  const inputClass = "w-full p-3 pr-12 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:border-[#39FF14]"

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#1a2e1a]/50 backdrop-blur border border-[#39FF14]/20 rounded-2xl p-6">
        
        <div className="flex bg-zinc-900 rounded-xl p-1 mb-6">
          <button onClick={()=>setMode("signin")} className={`flex-1 py-2 rounded-lg text-sm font-bold ${mode==="signin" ? "bg-[#39FF14] text-black" : "text-zinc-400"}`}>Sign In</button>
          <button onClick={()=>setMode("signup")} className={`flex-1 py-2 rounded-lg text-sm font-bold ${mode==="signup" ? "bg-[#39FF14] text-black" : "text-zinc-400"}`}>Sign Up</button>
        </div>

        <h2 className="text-white text-xl font-bold">{mode==="signin" ? "Welcome back" : "Create account"}</h2>
        <p className="text-zinc-400 text-sm mb-6">{mode==="signin" ? "Sign in to your vault" : "Join your vault"}</p>

        <input placeholder="Email" autoComplete="off" className={`${inputClass} mb-3`} />

        <div className="relative mb-3">
          <input type={showPassword ? "text" : "password"} placeholder="Password" autoComplete="new-password" className={inputClass} />
          <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white">
            {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
          </button>
        </div>

        {mode==="signup" && (
          <div className="relative mb-4">
            <input type={showConfirm ? "text" : "password"} placeholder="Confirm password" autoComplete="new-password" className={inputClass} />
            <button type="button" onClick={()=>setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white">
              {showConfirm ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
            </button>
          </div>
        )}

        <button className="w-full p-3 bg-[#39FF14] text-black font-bold rounded-xl hover:bg-[#32e612]">
          {mode==="signin" ? "Sign In" : "Sign Up"}
        </button>
      </div>

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
    </div>
  )
}
