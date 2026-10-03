'use client'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

export default function ChooseRolePage() {
  const router = useRouter()
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-4">
      {/* HEADER NUEVO - SOLO ESTO AGREGAMOS */}
      <div className="w-full max-w-5xl flex justify-between items-center py-4 mb-4">
        <div className="text-white font-bold text-xl tracking-widest">SIGILLUQ</div>
        <button onClick={handleSignOut} className="text-white border border-white/20 px-4 py-2 rounded-full text-sm hover:bg-white hover:text-black transition">
          Sign Out
        </button>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-center">Choose Your Path</h1>
      <p className="text-zinc-400 mb-10 text-center">Select how you want to use Sigilluq</p>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* CUADRADO 1 - HOST - LO DEJAMOS IGUAL */}
        <div onClick={() => router.push('/host')} className="group bg-[#111] border border-[#222] rounded-3xl p-8 hover:border-white transition cursor-pointer">
          <div className="text-zinc-500 text-xs font-bold tracking-widest mb-4">HOSTS</div>
          <h2 className="text-3xl font-bold text-white mb-2">EARN PASSIVE INCOME</h2>
          <p className="text-zinc-400 text-sm mb-6">Turn your extra storage into monthly revenue. Set your price, keep 90%.</p>
          <div className="bg-white text-black font-bold w-full py-3 rounded-full text-center group-hover:bg-zinc-200">Continue as Host →</div>
        </div>

        {/* CUADRADO 2 - VAULT - LO DEJAMOS IGUAL */}
        <div onClick={() => router.push('/dashboard')} className="group bg-[#111] border border-[#222] rounded-3xl p-8 hover:border-white transition cursor-pointer">
          <div className="text-zinc-500 text-xs font-bold tracking-widest mb-4">VAULTS</div>
          <h2 className="text-3xl font-bold text-white mb-2">SECURE YOUR DATA</h2>
          <p className="text-zinc-400 text-sm mb-6">Military-grade privacy at a fraction of Big Tech cost. Encrypted by design. Never see a tracker.</p>
          <div className="bg-zinc-800 text-white font-bold w-full py-3 rounded-full text-center group-hover:bg-zinc-700">Continue as Vault →</div>
        </div>
      </div>
    </div>
  )
}
