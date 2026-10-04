"use client";
import Link from "next/link"

export default function Pricing() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 pb-20">
      <div className="grid md:grid-cols-2 gap-6">
        {/* HOSTS - MISMO COLOR QUE HOST */}
        <div className="bg-[#111] border border-zinc-800 rounded-[24px] p-8">
          <p className="text-[10px] text-zinc-500 tracking-widest uppercase">Hosts • Earn Passive Income</p>
          <h3 className="text-2xl font-bold text-white mt-3">Earnings 50GB - 2TB</h3>
          <ul className="mt-6 space-y-3 text-zinc-400 text-sm">
            <li className="flex gap-2"><span className="text-[#39FF14]">✓</span> Launch your storage business in 1 click</li>
            <li className="flex gap-2"><span className="text-[#39FF14]">✓</span> Earn recurring passive income monthly</li>
            <li className="flex gap-2"><span className="text-[#39FF14]">✓</span> Scale & grow as a SIGILLUQ Partner</li>
          </ul>
          <Link href="/choose-role">
            <button className="mt-8 w-full bg-[#39FF14] text-black font-bold py-4 rounded-full hover:bg-[#39FF14]/90 transition">
              Become a Host
            </button>
          </Link>
        </div>

        {/* GUESTS - MISMO COLOR QUE HOST */}
        <div className="bg-[#111] border border-zinc-800 rounded-[24px] p-8">
          <p className="text-[10px] text-zinc-500 tracking-widest uppercase">Guests • Secure & Cheaper</p>
          <h3 className="text-2xl font-bold text-white mt-3">Storage 50GB - 2TB</h3>
          <ul className="mt-6 space-y-3 text-zinc-400 text-sm">
            <li className="flex gap-2"><span className="text-[#39FF14]">✓</span> Military-grade AES-256 end-to-end encryption</li>
            <li className="flex gap-2"><span className="text-[#39FF14]">✓</span> 50% Less than S3, Dropbox & Google Drive</li>
            <li className="flex gap-2"><span className="text-[#39FF14]">✓</span> Enterprise-grade redundancy & global availability</li>
          </ul>
          <Link href="/choose-role">
            <button className="mt-8 w-full bg-[#39FF14] text-black font-bold py-4 rounded-full hover:bg-[#39FF14]/90 transition">
              Start Storing
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
