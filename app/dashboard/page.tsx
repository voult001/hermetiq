"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [files, setFiles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

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

  const handleUpload = async (fileList: FileList | null) => {
    if (!fileList) return
    setUploading(true)
    // AQUÍ VA TU CEREBRO REAL: cut + encrypt + 5 shards + save to supabase
    console.log("Upload:", fileList[0].name)
    setTimeout(() => setUploading(false), 1500)
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <nav className="h-[64px] flex items-center justify-between px-6 border-b border-[#1A1A1A] bg-black">
        <div className="flex items-center gap-2 font-black text-xl">
          <span className="text-[#00FF88]">🛡️</span> SIGILLUQ
        </div>
        <div className="text-xs text-zinc-400">{user?.email}</div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-64px)]">
        {/* LEFT 50% - MY VAULT - TU MOTOR */}
        <div className="p-8 bg-[#0A0A0A] border-r border-[#1A1A1A]">
          <h1 className="text-3xl font-bold">My Vault</h1>
          <p className="text-zinc-400 text-sm mt-1 mb-8">Welcome back, {user?.email} • {files.length} files</p>

          {files.length === 0? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <p className="text-[11px] tracking-widest text-zinc-400 font-bold">HOSTS - EARN PASSIVE INCOME</p>
                <h2 className="text-2xl font-bold mt-3">Earnings 50GB - 2TB</h2>
                <button onClick={() => router.push('/host')} className="mt-8 bg-[#00FF66] text-black font-bold px-6 py-3 rounded-xl w-full">Become a Host</button>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <p className="text-[11px] tracking-widest text-zinc-400 font-bold">GUESTS - SECURE & CHEAPER</p>
                <h2 className="text-2xl font-bold mt-3">Storage 50GB - 2TB</h2>
                <button onClick={() => router.push('/store')} className="mt-8 bg-[#00FF66] text-black font-bold px-6 py-3 rounded-xl w-full">Start Storing</button>
              </div>
            </div>
          ) : (
            <div className="bg-[#141414] rounded-2xl overflow-hidden border border-zinc-800/50">
              <div className="grid grid-cols-12 px-5 py-3 text-[11px] text-zinc-500 uppercase tracking-widest border-b border-zinc-800">
                <div className="col-span-6">Name</div><div className="col-span-2">Size</div><div className="col-span-4">Status</div>
              </div>
              {files.map((f: any) => (
                <div key={f.id} className="grid grid-cols-12 px-5 py-4 border-b border-zinc-800/50 text-sm items-center hover:bg-[#1A1A1A]">
                  <div className="col-span-6 truncate font-medium">{f.name || f.file_name}</div>
                  <div className="col-span-2 text-zinc-400">{f.size || '—'}</div>
                  <div className="col-span-4"><span className="bg-[#00FF88]/20 text-[#00FF88] px-3 py-1 rounded-full text-xs font-bold">✓ Secure</span></div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT 50% - EL DE PUNTICOS DISCONTINUOS QUE TE GUSTÓ */}
        <div className="p-10 bg-[#111111] flex flex-col items-center">
          <h2 className="text-[32px] font-bold">Storage & Upload</h2>
          <p className="text-zinc-400 text-sm mt-1 mb-10">Cloud storage management • 10TB plan</p>

          <div className="relative w-[200px] h-[200px] mb-10">
            <div className="absolute inset-0 rounded-full border-[14px] border-zinc-800"></div>
            <div className="absolute inset-0 rounded-full border-[14px] border-[#00FF88] border-r-transparent border-b-transparent rotate-45"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[48px] font-bold text-[#00FF88] leading-none">62%</span>
              <span className="text-xs text-zinc-400 mt-1">6.2TB / 10TB used</span>
            </div>
          </div>

          <label className="w-full border-2 border-dashed border-[#00FF88]/40 rounded-2xl p-10 text-center cursor-pointer hover:border-[#00FF88]/70 bg-[#0A0A0A]/50 transition">
            <div className="text-3xl mb-3">☁️</div>
            <p className="font-bold">Drag & drop files here</p>
            <p className="text-xs text-zinc-500 mt-2">or click to browse • Supports PDF, XLSX, CSV, DOCX, TXT • Max 500MB per file</p>
            <input type="file" className="hidden" onChange={(e) => handleUpload(e.target.files)} multiple />
          </label>

          <button onClick={() => document.querySelector<HTMLInputElement>('input[type=file]')?.click()} disabled={uploading} className="w-full mt-4 bg-[#00FF88] text-black font-bold py-4 rounded-xl hover:bg-[#00FF88]/90 transition text-[15px]">
            {uploading? 'Uploading... Encrypting into 5 shards...' : '↑ Upload Files'}
          </button>

          <p className="text-[11px] text-zinc-500 mt-4">Files are encrypted end-to-end • 🛡️ Retention: 90 days</p>
        </div>
      </div>
    </div>
  )
}
