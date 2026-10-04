"use client"
import { HardDrive, DollarSign, Activity, Plus, Usb, LogOut, Server, TrendingUp, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HostPage(){
  const router = useRouter()
  return (
    <div className="min-h-screen bg-black">
      {/* HEADER */}
      <div className="border-b border-zinc-800 bg-[#0a0a0a] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#39FF14] rounded-lg flex items-center justify-center font-black text-black">S</div>
            <span className="text-white font-bold">SIGILLUQ</span>
            <span className="text-zinc-600 text-sm ml-2">Host • 616TB</span>
          </div>
          <button onClick={() => router.push('/')} className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm border border-zinc-800 px-4 py-2 rounded-full hover:border-zinc-700">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Host</h1>
        <p className="text-zinc-400 mb-10">Here's what's happening with your silos today</p>

        {/* 3 BIG CARDS */}
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
            <div className="flex gap-2 relative">
              <div className="flex-1 bg-zinc-900 rounded-xl p-3 text-center"><div className="text-white font-bold">$18</div><div className="text-[10px] text-zinc-500">NOV</div></div>
              <div className="flex-1 bg-zinc-900 rounded-xl p-3 text-center"><div className="text-white font-bold">$42</div><div className="text-[10px] text-zinc-500">DEC</div></div>
              <div className="flex-1 bg-[#39FF14] rounded-xl p-3 text-center"><div className="text-black font-bold">$23</div><div className="text-[10px] text-black/70">JAN</div></div>
            </div>
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
              <span className="text-zinc-500 text-sm">2 active • Encrypted • 616TB</span>
            </div>
            <div className="space-y-4">
              <div className="bg-black border border-zinc-800 rounded-2xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center"><HardDrive className="w-5 h-5 text-zinc-400" /></div>
                  <div><div className="text-white font-bold">Silo #1 • Mac Mini</div><div className="text-zinc-500 text-xs">1TB • 450GB used • /Volumes/Storage1</div></div>
                </div>
                <div className="text-right"><div className="text-[#39FF14] text-sm font-bold">$12/mo</div><div className="text-zinc-500 text-xs">Online</div></div>
              </div>
              <div className="bg-black border border-zinc-800 rounded-2xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center"><Usb className="w-5 h-5 text-zinc-400" /></div>
                  <div><div className="text-white font-bold">Silo #2 • External HDD</div><div className="text-zinc-500 text-xs">1TB • 250GB used • Seagate 4TB</div></div>
                </div>
                <div className="text-right"><div className="text-[#39FF14] text-sm font-bold">$11.4/mo</div><div className="text-zinc-500 text-xs">Online</div></div>
              </div>
            </div>
            <button className="w-full mt-6 border border-dashed border-[#39FF14]/40 bg-[#39FF14]/5 hover:bg-[#39FF14]/10 text-[#39FF14] font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition">
              <Plus className="w-5 h-5" /> Add Storage (USB / HDD / SSD)
            </button>
          </div>

          <div className="bg-[#111] border border-zinc-800 rounded-[24px] p-8">
            <h3 className="text-white font-bold text-xl mb-6">Payout History</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800"><div><div className="text-white text-sm font-bold">Jan 2025</div><div className="text-zinc-500 text-xs flex items-center gap-1"><Calendar className="w-3 h-3" /> Stripe • Paid</div></div><div className="text-[#39FF14] font-bold">$42.00</div></div>
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800"><div><div className="text-white text-sm font-bold">Dec 2024</div><div className="text-zinc-500 text-xs">Stripe • Paid</div></div><div className="text-white font-bold">$38.50</div></div>
              <div className="flex justify-between items-center"><div><div className="text-white text-sm font-bold">Nov 2024</div><div className="text-zinc-500 text-xs">Stripe • Paid</div></div><div className="text-white font-bold">$32.00</div></div>
            </div>
            <div className="mt-8 bg-black rounded-xl p-4 border border-zinc-800">
              <div className="text-zinc-500 text-[11px] uppercase tracking-widest font-bold mb-2">Security Info</div>
              <div className="text-zinc-400 text-xs leading-relaxed">Zero-knowledge encryption. Your silo stores only encrypted fragments. You cannot see, open or access guest files. Redundant & blind by design. SIGILLUQ 616TB.</div>
            </div>
          </div>
        </div>

        <div className="text-center text-zinc-600 text-xs mt-12">SIGILLUQ • Patent Pending • 616TB Network • Encrypted & Distributed</div>

      </div>
    </div>
  )
}
