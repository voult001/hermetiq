"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [files, setFiles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser()
      if (!data.user) { router.replace("/signin"); return }
      setUser(data.user)
      const { data: filesData } = await supabase.from('files').select('*')
      if (filesData) setFiles(filesData)
      setLoading(false)
    }
    checkUser()
  }, [router])

  if (loading) return <div className="p-8 bg-black min-h-screen text-white">Loading...</div>

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold">My Vault</h1>
      <p className="text-zinc-400 text-sm mt-1 mb-8">Welcome back, {user?.email}</p>
      {files.length === 0? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <p className="text-[11px] tracking-widest text-zinc-400 font-bold">HOSTS • EARN PASSIVE INCOME</p>
            <h2 className="text-2xl font-bold mt-3">Earnings 50GB - 2TB</h2>
            <button onClick={() => router.push('/host')} className="mt-8 bg-[#00FF66] text-black font-bold px-6 py-3 rounded-xl w-full">Become a Host</button>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <p className="text-[11px] tracking-widest text-zinc-400 font-bold">GUESTS • SECURE & CHEAPER</p>
            <h2 className="text-2xl font-bold mt-3">Storage 50GB - 2TB</h2>
            <button onClick={() => router.push('/store')} className="mt-8 bg-[#00FF66] text-black font-bold px-6 py-3 rounded-xl w-full">Start Storing</button>
          </div>
        </div>
      ) : (
        <div>{files.map((f) => <div key={f.id} className="p-4 bg-zinc-900 rounded-lg mb-2">{f.name}</div>)}</div>
      )}
    </div>
  )
}
