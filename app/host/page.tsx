"use client"
import { HardDrive, DollarSign, Activity, Plus, Usb } from "lucide-react"

export default function HostPage(){
  return (
    <div className="min-h-screen bg-black p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Host Dashboard</h1>
        <p className="text-zinc-400 mb-8">Monitor your vaults and earnings</p>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#111] border border-zinc-800 rounded-[20px] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-xl flex items-center justify-center">
                <HardDrive className="w-5 h-5 text-[#39FF14]" />
              </div>
              <span className="text-zinc-400 text-sm">Total Offered</span>
            </div>
            <div className="text-3xl font-bold text-white">2.0 TB</div>
            <div className="text-sm text-zinc-500 mt-1">2 vaults active</div>
            <div className="mt-4 w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div className="bg-[#39FF14] h-full w-[35%]"></div>
            </div>
            <div className="flex justify-between text-xs text-zinc-500 mt-2">
              <span>700GB rented</span><span>1.3TB free</span>
            </div>
          </div>

          <div className="bg-[#111] border border-zinc-800 rounded-[20px] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[#39FF14]" />
              </div>
              <span className="text-zinc-400 text-sm">Earnings</span>
            </div>
            <div className="text-3xl font-bold text-white">$23.40</div>
            <div className="text-sm text-[#39FF14] mt-1">+ $8.20 this week</div>
            <div className="text-xs text-zinc-500 mt-4">Next payout: Dec 15 • Stripe connected</div>
          </div>

          <div className="bg-[#111] border border-zinc-800 rounded-[20px] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#39FF14]" />
              </div>
              <span className="text-zinc-400 text-sm">Vault Status</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#39FF14] rounded-full animate-pulse"></div>
              <div className="text-3xl font-bold text-white">Online</div>
            </div>
            <div className="text-sm text-zinc-500 mt-1">Uptime 99.8% • 24 days</div>
            <div className="text-xs text-zinc-500 mt-4">Zero-knowledge: You can't see guest data</div>
          </div>
        </div>

        {/* Add Storage */}
        <div className="bg-[#111] border border-dashed border-[#39FF14]/30 rounded-[20px] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#39FF14]/10 rounded-2xl flex items-center justify-center">
              <Usb className="w-6 h-6 text-[#39FF14]" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Add More Space</h3>
              <p className="text-zinc-400 text-sm">Connect USB, external HDD, or add another vault to earn more</p>
            </div>
          </div>
          <button className="bg-[#39FF14] text-black font-bold px-8 py-3 rounded-full flex items-center gap-2 hover:bg-[#32e012] transition">
            <Plus className="w-5 h-5" /> Add Storage
          </button>
        </div>

      </div>
    </div>
  )
}
