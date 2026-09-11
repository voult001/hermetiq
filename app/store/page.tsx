import Link from "next/link"
export default function StorePage() {
  return (
    <div className="min-h-screen bg-[#0A0F0A] text-white">
      <header className="flex items-center justify-between px-[34px] py-[21px] border-b border-white/10">
        <Link href="/" className="font-mono text-[13px] tracking-[0.2em]">VAULTBNB <span className="text-[#39FF14]">STORE</span></Link>
        <div className="flex items-center gap-[21px]">
          <Link href="/host" className="font-mono text-[13px] opacity-60">Become a Host</Link>
          <Link href="/signup" className="bg-[#39FF14] text-black px-[21px] py-[8px] rounded-full font-mono text-[13px] font-bold">Sign Up</Link>
        </div>
      </header>
      <main className="max-w-[1280px] mx-auto px-[34px] pt-[89px] pb-[55px]">
        <div className="mb-[55px]">
          <h1 className="font-mono text-[34px] font-bold leading-[1.1] mb-[13px]">Store Files — Encrypted <span className="text-[#39FF14]">$0.005/GB</span></h1>
          <p className="font-mono text-[13px] opacity-50 max-w-[610px] leading-[1.6]">Military-grade encryption. Distributed across 616TB network. Pay only for what you use.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[21px] mb-[34px]">
          <div className="border border-white/10 rounded-[13px] p-[21px]"><div className="flex justify-between"><div><div className="font-mono text-[21px] font-bold">100GB</div><div className="font-mono text-[13px] opacity-60 mt-[5px]">$0.50/mo</div></div><div className="font-mono text-[8px] opacity-30">ENTRY</div></div></div>
          <div className="border border-[#39FF14] rounded-[13px] p-[21px] bg-[#39FF14]/5 shadow-[0_0_34px_rgba(57,255,20,0.15)] relative"><div className="absolute -top-[8px] right-[21px] bg-[#39FF14] text-black text-[8px] font-bold px-[8px] py-[3px] rounded-full">MOST POPULAR</div><div className="flex justify-between"><div><div className="font-mono text-[21px] font-bold">1TB</div><div className="font-mono text-[13px] mt-[5px]">$5/mo</div></div><div className="font-mono text-[8px] text-[#39FF14]">RECOMMENDED</div></div></div>
          <div className="border border-white/10 rounded-[13px] p-[21px]"><div className="flex justify-between"><div><div className="font-mono text-[21px] font-bold">10TB</div><div className="font-mono text-[13px] opacity-60 mt-[5px]">$50/mo</div></div><div className="font-mono text-[8px] opacity-30">PRO</div></div></div>
          <div className="border border-white/10 rounded-[13px] p-[21px]"><div className="flex justify-between"><div><div className="font-mono text-[21px] font-bold">500TB</div><div className="font-mono text-[13px] opacity-60 mt-[5px]">$2,500/mo</div></div><div className="font-mono text-[8px] opacity-30">ENTERPRISE</div></div></div>
        </div>
        <div className="flex items-center gap-[13px] mb-[21px]"><span className="font-mono text-[13px] tracking-widest border border-white/20 px-[13px] py-[8px] rounded-full">VAULT8X92</span><span className="font-mono text-[13px] text-[#39FF14]">-10% applied ✓</span></div>
        <button className="w-full h-[55px] bg-[#39FF14] text-black font-mono font-bold text-[13px] rounded-[13px]">Pay for Storage — $5/mo — Add Card</button>
        <div className="mt-[34px] flex justify-center gap-[21px] font-mono text-[13px] opacity-40"><Link href="/" className="underline">← Back</Link><span>•</span><Link href="/host" className="underline">Host → Earn</Link></div>
      </main>
    </div>
  )
}
