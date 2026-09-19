import Link from "next/link"

export function Hero() {
  return (
    <section className="px-4 py-20 text-center">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
        Turn Your Extra<br />Terabytes Into <span className="text-[#39FF14]">Cash</span>
      </h1>
      <p className="mx-auto mt-6 max-w-xl font-mono text-sm opacity-60 leading-relaxed">
        List your extra drive, NAS, or server. Earn monthly. SIGILLUQ handles payments & encryption.
      </p>
      {/* Buttons removed - only in header now */}
    </section>
  )
}
