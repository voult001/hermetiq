"use client";

export default function Pricing() {
  return (
    <section className="bg-black py-16 px-6">
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* HOSTS */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8">
          <p className="text-xs text-white/50 tracking-widest uppercase">Hosts • Earn Passive Income</p>
          <h3 className="text-2xl font-bold text-white mt-3">Earnings 50GB - 2TB</h3>
          <ul className="mt-6 space-y-3 text-white/80 text-sm">
            <li className="flex gap-2"><span className="text-[#00ff88]">✓</span> Launch your storage business in 1 click</li>
            <li className="flex gap-2"><span className="text-[#00ff88]">✓</span> Earn recurring passive income monthly</li>
            <li className="flex gap-2"><span className="text-[#00ff88]">✓</span> Scale & grow as a VaultBNB Partner</li>
          </ul>
          <button className="mt-8 w-full bg-[#00ff88] text-black font-bold py-3.5 rounded-lg hover:bg-[#00e67a] transition">
            Become a Host
          </button>
        </div>

        {/* GUESTS */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8">
          <p className="text-xs text-white/50 tracking-widest uppercase">Guests • Secure & Cheaper</p>
          <h3 className="text-2xl font-bold text-white mt-3">Storage 50GB - 2TB</h3>
          <ul className="mt-6 space-y-3 text-white/80 text-sm">
            <li className="flex gap-2"><span className="text-[#00ff88]">✓</span> Military-grade AES-256 end-to-end encryption</li>
            <li className="flex gap-2"><span className="text-[#00ff88]">✓</span> 50% Less than S3, Dropbox & Google Drive</li>
            <li className="flex gap-2"><span className="text-[#00ff88]">✓</span> Enterprise-grade redundancy & global availability</li>
          </ul>
          <button className="mt-8 w-full bg-[#00ff88] text-black font-bold py-3.5 rounded-lg hover:bg-[#00e67a] transition">
            Start Storing
          </button>
        </div>
      </div>
    </section>
  );
}
