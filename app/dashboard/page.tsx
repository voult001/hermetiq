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
        router.replace("/login")
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

      {/* Si no hay files, muestra los 2 cuadros verdes ADENTRO */}
      {files.length === 0? (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-2xl p-8 bg-white shadow-sm">
            <h2 className="text-2xl font-bold">Become a Host</h2>
            <p className="mt-2 text-gray-500">Turn Your Extra Terabytes Into Cash</p>
            <button onClick={() => router.push('/host')} className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl w-full font-bold">
              Become a Host
            </button>
          </div>
          <div className="border rounded-2xl p-8 bg-white shadow-sm">
            <h2 className="text-2xl font-bold">Start Storing</h2>
            <p className="mt-2 text-gray-500">Secure decentralized storage</p>
            <button onClick={() => router.push('/store')} className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl w-full font-bold">
              Start Storing
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-4">
          {files.map((f: any) => (
            <div key={f.id} className="border p-4 rounded">
              {f.name} - {f.size} bytes
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
