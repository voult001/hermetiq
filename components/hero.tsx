import Link from "next/link"

export function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28 text-left">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.9] mb-6">
        Turn Your Extra<br />Terabytes Into <span className="text-[#39FF14]">Cash</span>
      </h1>
      <p className="max-w-xl text-sm text-zinc-400 leading-relaxed">
        List your extra drive, NAS, or server. Earn monthly. SIGILLUQ handles payments & encryption.
      </p>
      <div className="mt-6 flex gap-2">
        <span className="px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-[10px] tracking-widest text-zinc-500">
          PATENT PENDING • SIGILLIQ V2
        </span>
        <span className="px-3 py-1 rounded-full border border-[#39FF14]/20 bg-[#39FF14]/5 text-[10px] tracking-widest text-[#39FF14]">
          NETWORK: 0 GB • STARTING FROM ZERO
        </span>
      </div>
    </section>
  )
}
