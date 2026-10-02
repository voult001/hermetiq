"use client"
import { useRouter } from "next/navigation"
export default function ChooseRole() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6">
      <h1 className="text-3xl font-bold text-white mb-2">Choose Your Path</h1>
      <p className="text-gray-400 mb-10">Select how you want to use SIGILLUQ</p>
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
          <h2 className="text-white font-bold">HOSTS - EARN PASSIVE INCOME</h2>
          <p className="text-gray-400 text-sm mt-2">50GB - 2TB</p>
          <button onClick={() => router.push('/host')} className="mt-6 w-full bg-[#00ff88] text-black font-bold py-3 rounded-full">Become a Host</button>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
          <h2 className="text-white font-bold">GUESTS - SECURE & CHEAPER</h2>
          <p className="text-gray-400 text-sm mt-2">50GB - 2TB</p>
          <button onClick={() => router.push('/dashboard')} className="mt-6 w-full bg-[#00ff88] text-black font-bold py-3 rounded-full">Start Storing</button>
        </div>
      </div>
    </div>
  )
}
