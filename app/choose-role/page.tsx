"use client"
import { useRouter } from "next/navigation"
import { HardDrive, Shield, ArrowRight } from "lucide-react"

export default function ChooseRolePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Choose Your Path
        </h1>
        <p className="text-zinc-400 text-lg">
          Select how you want to use <span className="text-[#39FF14] font-bold">SIGILLUQ</span>
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">

        {/* HOST CARD */}
        <div className="group relative bg-[#111] border border-zinc-800 rounded-[24px] p-8 hover:border-[#39FF14]/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(57,255,20,0.15)]">
          <div className="w-14 h-14 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-2xl flex items-center justify-center mb-6">
            <HardDrive className="w-7 h-7 text-[#39FF14]" />
          </div>

          <div className="mb-2 text-[#39FF14] text-xs font-bold tracking-[0.2em] uppercase">HOSTS - EARN PASSIVE INCOME</div>
          <h2 className="text-2xl font-bold text-white mb-3">Monetize Your Space</h2>
          <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
            Turn unused storage into monthly revenue. Encrypted, zero-access architecture.
          </p>

          <div className="space-y-2.5 mb-8">
            <div className="flex items-center gap-2.5 text-sm text-zinc-300"><div className="w-1.5 h-1.5 bg-[#39FF14] rounded-full"></div>500GB - 2TB per vault</div>
            <div className="flex items-center gap-2.5 text-sm text-zinc-300"><div className="w-1.5 h-1.5 bg-[#39FF14] rounded-full"></div>Monthly payouts, automated</div>
            <div className="flex items-center gap-2.5 text-sm text-zinc-300"><div className="w-1.5 h-1.5 bg-[#39FF14] rounded-full"></div>Zero-knowledge. You can't see data</div>
          </div>

          <button
            onClick={() => router.push('/host')}
            className="w-full bg-[#39FF14] text-black font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#32e012] transition group-hover:gap-3"
          >
            Become a Host <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* GUEST CARD */}
        <div className="group relative bg-[#111] border border-zinc-800 rounded-[24px] p-8 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.08)]">
          <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6">
            <Shield className="w-7 h-7 text-white" />
          </div>

          <div className="mb-2 text-zinc-400 text-xs font-bold tracking-[0.2em] uppercase">GUESTS - SECURE & CHEAPER</div>
          <h2 className="text-2xl font-bold text-white mb-3">Private Vault Storage</h2>
          <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
            Military-grade privacy at a fraction of Big Tech prices. Your data, only yours.
          </p>

          <div className="space-y-2.5 mb-8">
            <div className="flex items-center gap-2.5 text-sm text-zinc-300"><div className="w-1.5 h-1.5 bg-white rounded-full"></div>50% cheaper than Google & Dropbox</div>
            <div className="flex items-center gap-2.5 text-sm text-zinc-300"><div className="w-1.5 h-1.5 bg-white rounded-full"></div>End-to-end encrypted, blind architecture</div>
            <div className="flex items-center gap-2.5 text-sm text-zinc-300"><div className="w-1.5 h-1.5 bg-white rounded-full"></div>Redundant by design. Never lose a file</div>
          </div>

          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-white text-black font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-zinc-200 transition group-hover:gap-3"
          >
            Start Storing <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>

      <p className="text-zinc-600 text-xs mt-10">You can switch roles anytime in settings</p>
    </div>
  )
}
