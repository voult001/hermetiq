"use client"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SignInPage(){
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#1a2e1a]/50 backdrop-blur border border-[#39FF14]/20 rounded-2xl p-6">
        <h2 className="text-white text-xl font-bold">Welcome back</h2>
        <p className="text-zinc-400 text-sm mb-6">Sign in to your vault</p>

        <input
          value={email}
          onChange={e=>setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white"
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={e=>setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 pr-12 bg-zinc-900 border border-zinc-700 rounded-lg text-white"
          />
          <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
            {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
          </button>
        </div>

        <button className="w-full p-3 bg-[#39FF14] text-black font-bold rounded-lg">Sign In</button>
      </div>
    </div>
  )
}
