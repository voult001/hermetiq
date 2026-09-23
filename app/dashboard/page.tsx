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
      if (!data.user) {
        router.replace("/signin")
      } else {
        setUser(data.user)
        const { data: filesData } = await supabase.from('files').select('*').order('created_at', { ascending: false })
        if (filesData) setFiles(filesData)
      }
      setLoading(false)
    }
    checkUser()
  }, [router])

  if (loading) return <div className="p-8 bg-black min-h-screen text-white">Loading...</div>

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-xl font-bold">Vaultbnb Dashboard</h1>
      <p className="text-zinc-400 text-sm mt-1 mb-8">Bienvenido {user?.email}</p>

      {files.length === 0? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {/* CARD 1 - IGUAL A TU FOTO */}
          <div className="bg-[#0F0F0F] border border-zinc-800 rounded-2xl p-8">
            <p className="text-[11px] tracking-widest text-zinc-400 font-bold">HOSTS • EARN PASSIVE INCOME</p>
            <h2 className="text-2xl font-bold mt-3">Earnings 50GB - 2TB</h2>
            <div className="mt-5 space-y-3 text-sm text-zinc-300">
              <p><span className="text-[#00FF66]">✓</span> Launch your storage business in 1 click</p>
              <p><span className="text-[#00FF66]">✓</span> Earn recurring passive income monthly</p>
              <p><span className="text-[#00FF66]">✓</span> Scale & grow as a SIGILLUQ Partner</p>
            </div>
            <button
              onClick={() => router.push('/host')}
              className="mt-8 bg-[#00FF66] hover:bg-[#00e65c] text-black font-bold px-6 py-3 rounded-xl w-full"
            >
              Become a Host
            </button>
          </div>

          {/* CARD 2 - IGUAL A TU FOTO */}
          <div className="bg-[#0F0F0F] border border-zinc-800 rounded-2xl p-8">
            <p className="text-[11px] tracking-widest text-zinc-400 font-bold">GUESTS • SECURE & CHEAPER</p>
            <h2 className="text-2xl font-bold mt-3">Storage 50GB - 2TB</h2>
            <div className="mt-5 space-y-3 text-sm text-zinc-300">
              <p><span className="text-[#00FF66]">✓</span> Military-grade AES-256 end-to-end encryption</p>
              <p><span className="text-[#00FF66]">✓</span> 50% Less than S3, Dropbox & Google Drive</p>
              <p><span className="text-[#00FF66]">✓</span> Enterprise-grade redundancy & global availability</p>
            </div>
            <button
              onClick={() => router.push('/store')}
              className="mt-8 bg-[#00FF66] hover:bg-[#00e65c] text-black font-bold px-6 py-3 rounded-xl w-full"
            >
              Start Storing
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {files.map((f: any) => (
            <div key={f.id} className="border border-zinc-800 p-4 rounded bg-[#0F0F0F]">
              {f.name} - {f.size} bytes
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
