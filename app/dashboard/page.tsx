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
        router.push("/login")
      } else {
        setUser(data.user)
        const { data: filesData } = await supabase.from('files').select('*').order('created_at', { ascending: false })
        if (filesData) setFiles(filesData)
      }
      setLoading(false)
    }
    checkUser()
  }, [router])

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Vaultbnb Dashboard</h1>
      <p className="mb-4">Bienvenido {user?.email}</p>
      <div className="mt-8 grid gap-4">
        {files.length === 0 && <p>No files yet</p>}
        {files.map((f: any) => (
          <div key={f.id} className="border p-4 rounded">
            {f.name} - {f.size} bytes
          </div>
        ))}
      </div>
    </div>
  )
}
