"use client";
import { useState } from "react";

export default function HostPage() {
  const [storage] = useState(10);
  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 font-mono">
      {/* HEADER PRO */}
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-xl font-black tracking-widest">SIGILLUQ <span className="text-[#7CFF6B]">HOST</span></h1>
        <div className="bg-[#7CFF6B]/10 border border-[#7CFF6B]/30 px-4 py-1 rounded-full text-[#7CFF6B] text-xs">● LIVE NETWORK 625TB</div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* CARD VERIFIED PRO */}
        <div className="lg:col-span-2 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[32px] p-8">
          <div className="flex justify-between">
            <p className="text-xs opacity-50 tracking-[0.2em]">VERIFIED NODE</p>
            <p className="text-xs bg-white text-black px-3 py-1 rounded-full font-bold">VERIFIED</p>
          </div>
          <h2 className="text-7xl font-black mt-4">{storage.toFixed(2)} <span className="text-3xl opacity-50">GB</span></h2>
          <div className="w-full h-2 bg-white/10 rounded-full mt-6 overflow-hidden">
            <div className="h-full bg-[#7CFF6B] w-[65%]"></div>
          </div>
          <p className="text-xs opacity-40 mt-3">6.5 GB used of 10 GB • 34 hosts storing your shards</p>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-black/50 rounded-2xl p-4 border border-white/5">
              <p className="text-xs opacity-40">ESTE MES</p>
              <p className="text-2xl font-bold text-[#7CFF6B]">$4.20</p>
            </div>
            <div className="bg-black/50 rounded-2xl p-4 border border-white/5">
              <p className="text-xs opacity-40">UPTIME</p>
              <p className="text-2xl font-bold">99.9%</p>
            </div>
            <div className="bg-black/50 rounded-2xl p-4 border border-white/5">
              <p className="text-xs opacity-40">ARCHIVOS</p>
              <p className="text-2xl font-bold">142</p>
            </div>
          </div>
        </div>

        {/* EARNINGS */}
        <div className="bg-[#7CFF6B] text-black rounded-[32px] p-8 flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold tracking-widest">TOTAL GANADO</p>
            <p className="text-5xl font-black mt-2">$128.40</p>
            <p className="text-sm mt-2 opacity-70">A $0.008 / GB / mes</p>
          </div>
          <button className="mt-8 bg-black text-white w-full py-4 rounded-full font-bold">Retirar ganancias →</button>
          <p className="text-[10px] mt-4 text-center opacity-60">U.S. Pat. App. No. 64/153,968 - Patent Pending</p>
        </div>
      </div>

      {/* TABLA HISTORIAL */}
      <div className="max-w-6xl mx-auto mt-6 bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
        <h3 className="font-bold mb-6">Shards Almacenados Recientes</h3>
        <div className="space-y-3">
          {[
            { name: "Receipt.pdf.enc - shard 3/5", earn: "$0.02", time: "hace 2h" },
            { name: "FamilyPhotos.zip.enc - shard 1/5", earn: "$0.15", time: "hace 5h" },
            { name: "Contract.docx.enc - shard 2/5", earn: "$0.04", time: "ayer" },
          ].map(f => (
            <div key={f.name} className="flex justify-between items-center bg-black/50 p-4 rounded-2xl border border-white/5">
              <p className="text-sm">{f.name}</p>
              <div className="flex gap-4 items-center">
                <p className="text-[#7CFF6B] text-sm font-bold">+{f.earn}</p>
                <p className="text-xs opacity-40">{f.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
