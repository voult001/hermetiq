"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ChooseRolePage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header mini */}
      <div className="border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <span className="font-mono font-bold tracking-widest text-[#39FF14]">SIGILLUQ</span>
        <Link href="/" className="font-mono text-xs border border-white/20 rounded-full px-4 py-1.5 hover:bg-white hover:text-black transition">Sign Out</Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="text-center mb-12 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">Choose Your Path</h1>
          <p className="font-mono text-sm text-zinc-400">Select how you want to use Sigilluq — you can switch anytime</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 w-full max-w-5xl">
          {/* HOST CARD */}
          <div className="group relative rounded-[24px] border border-white/10 bg-zinc-900/50 p-8 backdrop-blur hover:border-[#39FF14]/40 hover:bg-zinc-900/80 transition-all duration-300">
            <div className="absolute top-8 right-8 font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-zinc-400">HOSTS</div>
            <div className="h-12 w-12 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center mb-6 group-hover:bg-[#39FF14]/20 transition">
              <span className="text-[#39FF14] text-xl">$</span>
            </div>
            <h2 className="font-mono font-bold text-xl tracking-widest mb-3">EARN PASSIVE INCOME</h2>
            <p className="font-mono text-sm text-zinc-400 leading-relaxed mb-8">Turn your extra storage into monthly revenue. Set your price, keep 90%. Your drive, your rules, your cash.</p>
            <div className="space-y-2 mb-8 font-mono text-xs text-zinc-500">
              <div className="flex gap-2"><span className="text-[#39FF14]">→</span> List drives, NAS, or servers</div>
              <div className="flex gap-2"><span className="text-[#39FF14]">→</span> AI scoring maximizes uptime</div>
              <div className="flex gap-2"><span className="text-[#39FF14]">→</span> Monthly payouts in USDC</div>
            </div>
            <button onClick={() => router.push('/host')} className="w-full rounded-full bg-white text-black font-mono font-bold py-3.5 hover:bg-[#39FF14] transition-all duration-300">Continue as Host →</button>
          </div>

          {/* VAULT CARD - Featured */}
          <div className="group relative rounded-[24px] border border-[#39FF14]/20 bg-gradient-to-b from-zinc-900 to-black p-8 backdrop-blur hover:border-[#39FF14]/60 transition-all duration-300 shadow-[0_0_60px_-20px_#39FF14]">
            <div className="absolute top-8 right-8 font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-full bg-[#39FF14] text-black font-bold">VAULTS</div>
            <div className="h-12 w-12 rounded-full bg-[#39FF14] flex items-center justify-center mb-6">
              <span className="text-black text-xl">◍</span>
            </div>
            <h2 className="font-mono font-bold text-xl tracking-widest mb-3">SECURE YOUR DATA</h2>
            <p className="font-mono text-sm text-zinc-400 leading-relaxed mb-8">Military-grade encryption, sharded across a fleet of Sigilluq hosts. Encrypted by you, invisible to everyone — even us.</p>
            <div className="space-y-2 mb-8 font-mono text-xs text-zinc-500">
              <div className="flex gap-2"><span className="text-[#39FF14]">→</span> Client-side AES-256-GCM</div>
              <div className="flex gap-2"><span className="text-[#39FF14]">→</span> Zero-knowledge architecture</div>
              <div className="flex gap-2"><span className="text-[#39FF14]">→</span> S3 compatible + instant retrieve</div>
            </div>
            <button onClick={() => router.push('/vault')} className="w-full rounded-full bg-[#39FF14] text-black font-mono font-bold py-3.5 hover:bg-[#39FF14]/90 transition-all duration-300 shadow-[0_0_30px_-10px_#39FF14]">Continue as Vault →</button>
          </div>
        </div>

        <p className="font-mono text-[11px] text-zinc-600 mt-10">Architecture built to be blind • Client-side crypto • HQ scoring engine</p>
      </div>
    </div>
  )
}
