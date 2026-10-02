"use client"
import { useRouter } from "next/navigation"

export default function ChooseRole() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6">
      <h1 className="text-3xl font-bold text-white mb-2">Choose Your Path</h1>
      <p className="text-gray-400 mb-10">Select how you want to use SIGILLUQ</p>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
        
        {/* HOSTS */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-8 hover:border-[#00ff88]/50 transition">
          <h2 className="text-white font-bold text-lg">HOSTS - EARN PASSIVE INCOME</h2>
          <p className="text-gray-400 text-sm mt-2">Earnings 50GB - 2TB</p>
          <p className="text-gray-500 text-xs mt-4">Rent your unused storage. Get paid monthly.</p>
          <button 
            onClick={() => router.push('/onboarding/host')}
            className="mt-6 w-full bg-[#00ff88] text-black font-bold py-3 rounded-full hover:bg-[#00e67a]"
          >
            Become a Host
          </button>
        </div>

        {/* GUESTS */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-8 hover:border-[#00ff88]/50 transition">
          <h2 className="text-white font-bold text-lg">GUESTS - SECURE & CHEAPER</h2>
          <p className="text-gray-400 text-sm mt-2">Storage 50GB - 2TB</p>
          <p className="text-gray-500 text-xs mt-4">Encrypted, sharded storage. Cheaper than S3.</p>
          <button 
            onClick={() => router.push('/dashboard')}
            className="mt-6 w-full bg-[#00ff88] text-black font-bold py-3 rounded-full hover:bg-[#00e67a]"
          >
            Start Storing
          </button>
        </div>

      </div>
    </div>
  )
}
