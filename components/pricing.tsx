// components/pricing.tsx - VAULTBNB FINAL LOCKED - Hosts & Guests
import Link from "next/link"

export default function Pricing() {
  return (
    <div className="w-full bg-[#070a07] py-20 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* HOSTS CARD - LOCKED COPY */}
        <div className="relative rounded-[20px] bg-[#111a11] border border-[#39ff6a] p-8 shadow-[0_0_40px_rgba(57,255,106,0.2)]">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg border border-[#39ff6a]/50 bg-[#1a2a1a] flex items-center justify-center">
              <span className="text-[#39ff6a]">◈</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-none">Hosts</h3>
              <p className="text-[#39ff6a]/60 text-[11px] tracking-widest uppercase mt-1">Earn Passive Income</p>
            </div>
          </div>

          <div className="rounded-xl border border-[#39ff6a]/30 bg-black/40 p-6 mb-8">
            <p className="text-white/40 text-xs mb-2 font-mono">Earnings</p>
            <p className="text-white font-mono font-bold text-3xl tracking-wide">50GB - 2TB</p>
          </div>

          <ul className="space-y-4 mb-10 font-mono text-[13px] text-white/90">
            <li className="flex gap-3"><span className="text-[#39ff6a]">✓</span> Launch your storage business in 1 click</li>
            <li className="flex gap-3"><span className="text-[#39ff6a]">✓</span> Earn recurring passive income monthly</li>
            <li className="flex gap-3"><span className="text-[#39ff6a]">✓</span> Scale & grow as a Vaultbnb Partner</li>
          </ul>

          <Link href="/host" className="flex w-full h-[48px] items-center justify-center rounded-full bg-[#39ff6a] text-black font-bold text-sm hover:bg-[#39ff6a]/90 transition-colors">
            Become a Host
          </Link>
        </div>

        {/* GUESTS CARD - LOCKED COPY */}
        <div className="relative rounded-[20px] bg-[#111] border border-white/15 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center">
              <span className="text-white/70">◈</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-none">Guests</h3>
              <p className="text-white/50 text-[11px] tracking-widest uppercase mt-1">Secure & Cheaper</p>
            </div>
          </div>

          <div className="rounded-xl border border-white/15 bg-black/40 p-6 mb-8">
            <p className="text-white/40 text-xs mb-2 font-mono">Storage</p>
            <p className="text-white font-mono font-bold text-3xl tracking-wide">50GB - 2TB</p>
          </div>

          <ul className="space-y-4 mb-10 font-mono text-[13px] text-white/70">
            <li className="flex gap-3"><span className="text-[#7aff7a]">✓</span> Military-grade AES-256 end-to-end encryption</li>
            <li className="flex gap-3"><span className="text-[#7aff7a]">✓</span> 50% less than S3, Dropbox & Google Drive</li>
            <li className="flex gap-3 leading-tight"><span className="text-[#7aff7a]">✓</span> Enterprise-grade redundancy & global availability</li>
          </ul>

          <Link href="/signup" className="flex w-full h-[48px] items-center justify-center rounded-full border border-white/20 bg-transparent text-white font-bold text-sm hover:bg-white/10 transition-colors">
            Start Storing
          </Link>
        </div>

      </div>
    </div>
  )
}
