"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push("/signin")
      else setUser(data.user)
    })
  }, [])

  if (!user) return <div style={{padding:40}}>Loading...</div>

  return (
    <div style={{padding:40, fontFamily:"monospace"}}>
      <h1>Welcome! 🎉</h1>
      <p>Logged in as: {user.email}</p>
      <button onClick={async () => {
        await supabase.auth.signOut()
        router.push("/")
      }} style={{marginTop:20, padding:"10px 20px", background:"black", color:"lime", cursor:"pointer"}}>
        Sign Out
      </button>
    </div>
  )
}
