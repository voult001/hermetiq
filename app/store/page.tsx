import Link from "next/link"
import { VaultSlider } from "@/components/VaultSlider"

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
          <h1 className="font-mono text-[34px] font-bold leading-[1.1] mb-[13px]">Store Files - Encrypted <span className="text-[#39FF14]">$0.005/GB</span></h1>
          <p className="font-mono text-[13px] opacity-50 max-w-[610px] leading-[1.6]">Military-grade encryption. Distributed across 616TB network. Pay only for what you use.</p>
        </div>

        {/* NEW ENGINE - WHOLE PACKAGE SLIDER */}
        <div className="mb-[34px] max-w-[600px]">
          <VaultSlider />
          <p className="font-mono text-[11px] opacity-40 mt-[13px]">Guest sees whole package • Internally fragmented into 50GB shards • Authorized only after payment=TRUE</p>
        </div>

        <div className="flex items-center gap-[13px] mb-[21px]"><span className="font-mono text-[13px] tracking-widest border border-white/20 px-[13px] py-[8px] rounded-full">VAULT69X2</span><span className="font-mono text-[13px] opacity-40">Near Me - Fast Parallel Delivery</span></div>

        <div className="mt-[34px] flex justify-center gap-[21px] font-mono text-[13px] opacity-40"><Link href="/" className="underline">- Back</Link><span>-</span><Link href="/host" className="underline">Host - Earn $</Link></div>
      </main>
    </div>
  )
}
