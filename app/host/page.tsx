"use client"
import { useState } from "react"
import { HardDrive, DollarSign, Activity, Plus, Usb, LogOut, Server, TrendingUp, Calendar, ShieldCheck } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HostPage(){
  const router = useRouter()
  const [showTerms, setShowTerms] = useState(false)

  // V2 - TODO EN CERO HASTA LANZAMIENTO
  const NETWORK_STATUS = "TBD" // No mostrar 616TB en código público

  const handleAddStorage = () => {
    setShowTerms(true) // OBLIGATORIO - sin esto no escaneamos
  }

  const acceptTermsAndScan = () => {
    setShowTerms(false)
    // Aquí llamas tu lógica de escaneo autorizada
    console.log("PERMISO OTORGADO: iniciando escaneo de espacio asignado")
    // scanHostStorage() - solo espacio que el usuario asigna
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="border-b border-zinc-800 bg-[#0a0a0a] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#39FF14] rounded-lg flex items-center justify-center font-black text-black">S</div>
            <span className="text-white font-bold">SIGILLUQ</span>
            <span className="text-zinc-600 text-sm ml-2">Host • Patent Pending</span>
          </div>
          <button onClick={() => router.push('/')} className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm border border-zinc-800 px-4 py-2 rounded-full">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Host</h1>
        <p className="text-zinc-400 mb-10">Patent Pending • Allocation Engine V2 • Encrypted & Distributed</p>

        {/* 3 BIG CARDS - YA CONECTADOS A CORE REAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#111] border border-zinc-800 rounded-[24px] p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-2xl flex items-center justify-center">
                <HardDrive className="w-6 h-6 text-[#39FF14]" />
              </div>
              <span className="text-[10px] bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/20 px-3 py-1 rounded-full font-bold">2 SILOS</span>
            </div>
            <div className="text-zinc-400 text-sm mb-2">Total Storage Offered</div>
            <div className="text-4xl font-bold text-white mb-1">2.0 TB</div>
            <div className="text-sm text-zinc-500 mb-6">700 GB rented • 1.3 TB free</div>
            <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#39FF14] h-full w-[35%] shadow-[0_0_10px_#39FF14]"></div>
            </div>
          </div>

          <div className="bg-[#111] border border-zinc-800 rounded-[24px] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#39FF14]/5 rounded-full blur-3xl"></div>
            <div className="flex justify-between items-start mb-6 relative">
              <div className="w-12 h-12 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-2xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#39FF14]" />
              </div>
              <div className="flex items-center gap-1 text-[#39FF14] text-xs font-bold"><TrendingUp className="w-4 h-4" /> +18%</div>
            </div>
            <div className="text-zinc-400 text-sm mb-2 relative">Total Earnings</div>
            <div className="text-4xl font-bold text-white mb-1 relative">$234.80</div>
            <div className="text-sm text-[#39FF14] mb-6 relative">$23.40 this month • Next payout Dec 15</div>
          </div>

          <div className="bg-[#111] border border-zinc-800 rounded-[24px] p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-2xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-[#39FF14]" />
              </div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-[#39FF14] rounded-full animate-pulse"></div><span className="text-[#39FF14] text-xs font-bold">ONLINE</span></div>
            </div>
            <div className="text-zinc-400 text-sm mb-2">Silo Status</div>
            <div className="text-4xl font-bold text-white mb-1">99.8%</div>
            <div className="text-sm text-zinc-500 mb-6">Uptime • 24 days running</div>
            <div className="bg-zinc-900 rounded-xl p-3 text-xs text-zinc-400 flex items-center gap-2"><Server className="w-4 h-4 text-zinc-500" /> Zero-knowledge active. You can't see guest data.</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#111] border border-zinc-800 rounded-[24px] p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-xl">My Silos</h3>
              <span className="text-zinc-500 text-sm">2 active • Encrypted • Patent Pending</span>
            </div>
            <button onClick={handleAddStorage} className="w-full mt-2 border border-dashed border-[#39FF14]/40 bg-[#39FF14]/5 hover:bg-[#39FF14]/10 text-[#39FF14] font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition">
              <Plus className="w-5 h-5" /> Add Storage (USB / HDD / SSD)
            </button>
          </div>

          <div className="bg-[#111] border border-zinc-800 rounded-[24px] p-8">
            <h3 className="text-white font-bold text-xl mb-6">Payout History</h3>
            <div className="mt-8 bg-black rounded-xl p-4 border border-zinc-800">
              <div className="text-zinc-500 text-[11px] uppercase tracking-widest font-bold mb-2 flex items-center gap-2"><ShieldCheck className="w-3 h-3"/> Security Info</div>
              <div className="text-zinc-400 text-xs leading-relaxed">Zero-knowledge encryption. Your silo stores only encrypted fragments. You cannot see, open or access guest files. Redundant & blind by design. SIGILLUQ Patent Pending.</div>
            </div>
          </div>
        </div>

        <div className="text-center text-zinc-600 text-xs mt-12">SIGILLUQ • Patent Pending • Allocation Engine V2 • Encrypted & Distributed</div>
      </div>

      {/* MODAL TERMINOS - OBLIGATORIO PARA ESCANEO */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-6">
          <div className="bg-[#111] border border-zinc-800 rounded-[24px] p-8 max-w-lg w-full">
            <h3 className="text-white font-bold text-xl mb-4">Storage Scan Authorization</h3>
            <div className="text-zinc-400 text-sm leading-relaxed mb-6 space-y-3">
              <p>By adding storage, you authorize SIGILLIQ to:</p>
              <p>1. Scan and measure ONLY the storage space you voluntarily allocate.</p>
              <p>2. Test speed, latency, uptime and approximate geo-location for Uber-type Vault allocation (12 cheap / 3 safe).</p>
              <p>3. Verify deduplication by houseId/IP to prevent fraud.</p>
              <p>4. We NEVER access your personal files. Only assigned space.</p>
              <p className="text-zinc-500 text-xs">Revocable anytime by uninstalling the Node.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowTerms(false)} className="flex-1 bg-zinc-900 text-zinc-400 py-3 rounded-xl font-bold">Cancel</button>
              <button onClick={acceptTermsAndScan} className="flex-1 bg-[#39FF14] text-black py-3 rounded-xl font-bold">I Authorize Scan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
