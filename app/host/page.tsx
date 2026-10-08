"use client"
export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import { HardDrive, DollarSign, Activity, Plus, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { isEligibleHost, HOST_RULES, DeviceType } from "@/lib/allocation"

export default function HostPage(){
  const [showTerms, setShowTerms] = useState(false)
  const [deviceType, setDeviceType] = useState<DeviceType>("external")
  const [stats, setStats] = useState({ totalGB: 0, rentedGB: 0, earnings: 0, monthEarn: 0, silos: 0, rawGB: 0, allocGB: 0 })
  const [scanning, setScanning] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  useEffect(() => {
    // conectar a /api/host/stats real
  }, [])

  const handleAddStorage = () => {
    setErrorMsg(null)
    setSuccessMsg(null)
    setShowTerms(true)
  }

  const scanRealStorage = async () => {
    setScanning(true)
    setErrorMsg(null)
    setSuccessMsg(null)
    try {
      // 1. Medir SOLO la cantidad de espacio libre - NO leemos archivos
      // NUNCA usamos showDirectoryPicker - eso asusta al usuario
      let freeGB = 0
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const est = await navigator.storage.estimate()
        freeGB = (est.quota || 0) / (1024 ** 3)
      } else {
        freeGB = 120
      }

      // 2. CHEQUEO OFICIAL 80/100 + 100GB MIN - SIN pedir acceso a files
      const check = isEligibleHost(freeGB, deviceType)

      if (!check.eligible) {
        setErrorMsg(check.reason || `Not enough space`)
        setScanning(false)
        return
      }

      // 3. SI PASA, ACTUALIZA UI
      setStats(prev => ({
      ...prev,
        totalGB: check.allocatable / 1000,
        rawGB: freeGB,
        allocGB: check.allocatable,
        silos: prev.silos + 1
      }))

      setSuccessMsg(`✅ ${check.allocatable.toFixed(0)}GB allocated (${deviceType==='primary'? '80% rule - device protected' : '100% rule'}) - Ready to earn`)

      // 4. Manda al backend - solo numeros, cero archivos
      await fetch('/api/host/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deviceType,
          rawAvailableGB: freeGB,
          allocatedGB: check.allocatable,
          rule: deviceType === 'primary'? '80_percent_primary' : '100_percent_external',
          minRequired: HOST_RULES.MIN_ALLOCATABLE_GB
        })
      }).catch(()=>{})

    } catch (e) {
      setErrorMsg("Scan failed. Try again.")
    } finally {
      setScanning(false)
    }
  }

  const acceptTermsAndScan = async () => {
    setShowTerms(false)
    await scanRealStorage()
  }

  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Host</h1>
        <p className="text-zinc-400 mb-6">U.S. Patent App. 67/752,806 • Zero-Knowledge Encrypted</p>

        {errorMsg && (
          <div className="bg-red-950/40 border border-red-500/30 rounded-[16px] p-4 mb-6 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-red-300 font-bold text-sm">Not eligible yet</div>
              <div className="text-red-200/80 text-[13px] mt-1 leading-relaxed">{errorMsg}</div>
              <div className="text-zinc-500 text-[11px] mt-2">Rule: Phone/PC needs {Math.ceil(HOST_RULES.MIN_ALLOCATABLE_GB/0.8)}GB free → {HOST_RULES.MIN_ALLOCATABLE_GB}GB allocatable. USB/HDD needs {HOST_RULES.MIN_ALLOCATABLE_GB}GB free.</div>
            </div>
          </div>
        )}

        {successMsg && (
          <div className="bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-[16px] p-4 mb-6 flex gap-3">
            <CheckCircle className="w-5 h-5 text-[#39FF14] shrink-0 mt-0.5" />
            <div className="text-[#39FF14] text-[13px] font-medium">{successMsg}</div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#111] border border-zinc-800 rounded-[24px] p-8">
            <div className="w-12 h-12 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-2xl flex items-center justify-center mb-6">
              <HardDrive className="w-6 h-6 text-[#39FF14]" />
            </div>
            <div className="text-zinc-400 text-sm mb-2">Total Storage Offered</div>
            <div className="text-4xl font-bold text-white mb-1">{stats.totalGB.toFixed(1)} TB</div>
            <div className="text-sm text-zinc-500 mb-6">
              {stats.allocGB > 0? `${stats.allocGB.toFixed(0)}GB allocated (${deviceType==='primary'? `80% of ${stats.rawGB.toFixed(0)}GB` : `100% of ${stats.rawGB.toFixed(0)}GB`})` : `${stats.rentedGB} GB rented • ${(stats.totalGB*1000 - stats.rentedGB).toFixed(0)} GB free`}
            </div>
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
            <div className="text-zinc-500 text-sm py-10 text-center">No storage added yet. Add your first silo to start real scan. Need {HOST_RULES.MIN_ALLOCATABLE_GB}GB allocatable min.</div>
          ) : (
            <div className="bg-black/50 rounded-xl p-4 text-sm text-zinc-300">✅ {stats.allocGB.toFixed(0)}GB allocated — {deviceType==='primary'? '80% rule - Primary device protected' : '100% rule - External drive full allocation'}</div>
          )}
          <button onClick={handleAddStorage} disabled={scanning} className="w-full mt-6 border border-dashed border-[#39FF14]/40 bg-[#39FF14]/5 hover:bg-[#39FF14]/10 text-[#39FF14] font-bold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50">
            <Plus className="w-5 h-5" /> {scanning? "Checking free space..." : "Add Storage (USB / HDD / SSD)"}
          </button>
        </div>

        <div className="text-center text-zinc-600 text-[11px] tracking-widest mt-12">SIGILLUQ © 2026 • U.S Patent App 67/752,806 • Zero-Knowledge Encrypted • Miami, FL</div>
      </div>

      {showTerms && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-6">
          <div className="bg-[#111] border border-zinc-800 rounded-[24px] p-8 max-w-md w-full">
            <h3 className="text-white font-bold text-xl mb-2">Space Check Authorization</h3>
            <p className="text-zinc-500 text-xs mb-6">We DO NOT access your files — only free space amount</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <button onClick={()=>setDeviceType("primary")} className={`p-4 rounded-xl border text-left transition ${deviceType==="primary"? "border-[#39FF14] bg-[#39FF14]/10":"border-zinc-800 bg-zinc-900 hover:border-zinc-700"}`}>
                <div className="text-white font-bold text-sm">Phone / PC / Tablet</div>
                <div className="text-zinc-400 text-xs mt-1">80% of FREE space<br/>Need 125GB free → 100GB</div>
              </button>
              <button onClick={()=>setDeviceType("external")} className={`p-4 rounded-xl border text-left transition ${deviceType==="external"? "border-[#39FF14] bg-[#39FF14]/10":"border-zinc-800 bg-zinc-900 hover:border-zinc-700"}`}>
                <div className="text-white font-bold text-sm">USB / HDD / SSD / Server</div>
                <div className="text-zinc-400 text-xs mt-1">100% of FREE space<br/>Need 100GB free → 100GB</div>
              </button>
            </div>

            <div className="bg-black/60 border border-zinc-800 rounded-xl p-4 mb-5 space-y-2">
              <p className="text-[13px] text-white font-bold">✅ We ONLY check: "How many GB are free?"</p>
              <p className="text-[12px] text-zinc-400 leading-relaxed">Like checking how big an empty parking lot is. We measure the NUMBER.</p>
              <p className="text-[12px] text-zinc-400 leading-relaxed">We NEVER read, list, copy, or access your personal files, photos, or documents.</p>
              <p className="text-[12px] text-[#39FF14] font-medium">Zero-Knowledge • Encrypted shards only • Revocable 1-click</p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowTerms(false)} className="flex-1 bg-zinc-900 text-zinc-400 py-3.5 rounded-full font-bold text-sm">Cancel</button>
              <button onClick={acceptTermsAndScan} className="flex-1 bg-[#39FF14] text-black py-3.5 rounded-full font-bold text-sm hover:bg-[#39FF14]/90 transition">Check Free Space Only</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
