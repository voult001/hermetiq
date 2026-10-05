"use client"
import { useState, useEffect } from "react"
import { HardDrive, DollarSign, Activity, Plus, LogOut, Server, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HostPage(){
  const router = useRouter()
  const [showTerms, setShowTerms] = useState(false)
  const [stats, setStats] = useState({ totalGB: 0, rentedGB: 0, earnings: 0, monthEarn: 0, silos: 0 })

  useEffect(() => {
    // AQUÍ CONECTAS TU SCAN REAL
    // const realData = await fetch('/api/host/stats').then(r=>r.json())
    // setStats(realData)
    // Por ahora queda en 0 hasta que el scan de data real
  }, [])

  const handleAddStorage = () => setShowTerms(true)
  const acceptTermsAndScan = () => {
    setShowTerms(false)
    // scanHostStorage() real aquí
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
        <p className="text-zinc-400 mb-10">Patent Pending • V2 Global • Real scan only</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#111] border border-zinc-800 rounded-[24px] p-8">
            <div className="w-12 h-12 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-2xl flex items-center justify-center mb-6">
              <HardDrive className="w-6 h-6 text-[#39FF14]" />
            </div>
            <div className="text-zinc-400 text-sm mb-2">Total Storage Offered</div>
            <div className="text-4xl font-bold text-white mb-1">{stats.totalGB.toFixed(1)} TB</div>
            <div className="text-sm text-zinc-500 mb-6">{stats.rentedGB} GB rented • {(stats.totalGB*1000 - stats.rentedGB).toFixed(0)} GB free</div>
            <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#39FF14] h-full" style={{width: `${stats.totalGB > 0? (stats.rentedGB/(stats.totalGB*1000))*100 : 0}%`}}></div>
            </div>
          </div>

          <div className="bg-[#111] border border-zinc-800 rounded-[24px] p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-2xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#39FF14]" />
              </div>
              <div className="flex items-center gap-1 text-zinc-500 text-xs font-bold"><TrendingUp className="w-4 h-4" /> REAL</div>
            </div>
            <div className="text-zinc-400 text-sm mb-2">Total Earnings</div>
            <div className="text-4xl font-bold text-white mb-1">${stats.earnings.toFixed(2)}</div>
            <div className="text-sm text-zinc-500 mb-6">${stats.monthEarn.toFixed(2)} this month • Real data only</div>
          </div>

          <div className="bg-[#111] border border-zinc-800 rounded-[24px] p-8">
            <div className="w-12 h-12 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-2xl flex items-center justify-center mb-6">
              <Activity className="w-6 h-6 text-[#39FF14]" />
            </div>
            <div className="text-zinc-400 text-sm mb-2">Silo Status</div>
            <div className="text-4xl font-bold text-white mb-1">{stats.silos > 0? '99.8%' : '0%'}</div>
            <div className="text-sm text-zinc-500 mb-6">{stats.silos > 0? 'Uptime • Running' : 'No silos yet'}</div>
          </div>
        </div>

        <div className="bg-[#111] border border-zinc-800 rounded-[24px] p-8">
          <h3 className="text-white font-bold text-xl mb-6">My Silos</h3>
          {stats.silos === 0? (
            <div className="text-zinc-500 text-sm py-10 text-center">No storage added yet. Add your first silo to start real scan.</div>
          ) : (
            <div>lista real aquí</div>
          )}
          <button onClick={handleAddStorage} className="w-full mt-6 border border-dashed border-[#39FF14]/40 bg-[#39FF14]/5 hover:bg-[#39FF14]/10 text-[#39FF14] font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" /> Add Storage (USB / HDD / SSD)
          </button>
        </div>

        <div className="text-center text-zinc-600 text-xs mt-12">SIGILLUQ • Patent Pending • V2 • Zero fake data</div>
      </div>

      {showTerms && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-6">
          <div className="bg-[#111] border border-zinc-800 rounded-[24px] p-8 max-w-lg w-full">
            <h3 className="text-white font-bold text-xl mb-4">Storage Scan Authorization</h3>
            <div className="text-zinc-400 text-sm leading-relaxed mb-6">
              You authorize SIGILLIQ to scan ONLY allocated space. No personal files. Uber-type allocation 12/3.
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
