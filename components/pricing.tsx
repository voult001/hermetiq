// VaultCards.jsx - FINAL LOCKED VERSION
export default function VaultCards() {
  return (
    <div className="w-full bg-[#0a0f0a] py-20 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* HOSTS CARD - EARN PASSIVE INCOME */}
        <div className="relative rounded-2xl bg-[#111a11] border border-[#39ff6a] p-8
                        shadow-[0_0_30px_rgba(57,255,106,0.25)]">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg border border-[#39ff6a] bg-[#1a2a1a] flex items-center justify-center">
              <span className="text-[#39ff6a] text-lg">🏠</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-none">Hosts</h3>
              <p className="text-[#39ff6a]/70 text-[11px] tracking-widest uppercase mt-1">
                Earn Passive Income
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[#39ff6a]/40 bg-black/30 p-6 mb-8">
            <p className="text-white/50 text-xs mb-2">Earnings</p>
            <p className="text-white font-mono font-bold text-3xl tracking-wide">
              50GB - 2TB
            </p>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex gap-3 text-[13px] text-white/90 font-mono">
              <span className="text-[#39ff6a]">✓</span> Launch your storage business in 1 click
            </li>
            <li className="flex gap-3 text-[13px] text-white/90 font-mono">
              <span className="text-[#39ff6a]">✓</span> Earn recurring passive income monthly
            </li>
            <li className="flex gap-3 text-[13px] text-white/90 font-mono">
              <span className="text-[#39ff6a]">✓</span> Scale & grow as a Vaultbnb Partner
            </li>
          </ul>

          <button className="w-full h-[48px] rounded-xl bg-[#7aff7a] text-black font-mono font-bold text-sm
                             hover:bg-[#6af06a] transition-colors">
            Become a Host
          </button>
        </div>

        {/* GUESTS CARD - SECURE & CHEAPER */}
        <div className="relative rounded-2xl bg-[#111415] border border-white/10 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center">
              <span className="text-[#7aff7a] text-lg">🗄️</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-none">Guests</h3>
              <p className="text-white/50 text-[11px] tracking-widest uppercase mt-1">
                Secure & Cheaper
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-white/20 bg-black/30 p-6 mb-8">
            <p className="text-white/50 text-xs mb-2">Storage</p>
            <p className="text-white font-mono font-bold text-3xl tracking-wide">
              50GB - 2TB
            </p>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex gap-3 text-[13px] text-white/80 font-mono">
              <span className="text-[#7aff7a]">✓</span> Military-grade AES-256 end-to-end encryption
            </li>
            <li className="flex gap-3 text-[13px] text-white/80 font-mono">
              <span className="text-[#7aff7a]">✓</span> 50% less than S3, Dropbox & Google Drive
            </li>
            <li className="flex gap-3 text-[13px] text-white/80 font-mono leading-tight">
              <span className="text-[#7aff7a]">✓</span> Enterprise-grade redundancy & global availability
            </li>
          </ul>

          <button className="w-full h-[48px] rounded-xl border border-white/20 bg-transparent text-white font-mono font-bold text-sm
                             hover:bg-white/5 transition-colors">
            Start Storing
          </button>
        </div>

      </div>
    </div>
  );
}
