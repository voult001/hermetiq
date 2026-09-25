"use client";
import { useState } from "react";

export default function HostPage() {
  const [storage] = useState(10);
  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 font-mono">
      {/* NAV QUE TE SALVA - YA NO TE QUEDAS ATRAPADO */}
      <div className="flex justify-between items-center max-w-6xl mx-auto mb-8 border-b border-white/10 pb-4">
        <a href="/" className="text-xl font-black tracking-widest hover:text-[#7CFF6B]">← SIGILLUQ</a>
        <div className="flex gap-4 items-center">
          <a href="/" className="text-sm text-white/60 hover:text-white">Inicio</a>
          <a href="/login" className="text-sm bg-white text-black px-4 py-1.5 rounded-full font-bold hover:bg-[#7CFF6B]">Sign Out</a>
        </div>
      </div>

      {/* HEADER PRO */}
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-xl font-black tracking-widest">SIGILLUQ <span className="text-white/40">HOST</span></h1>
        <div className="bg-[#7CFF6B]/10 border border-[#7CFF6B]/30 px-4 py-1 rounded-full text-xs text-[#7CFF6B]">● LIVE NETWORK</div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CARD VERIFIED PRO */}
        <div className="lg:col-span-2 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[24px] p-8">
          <div className="flex justify-between">
            <p className="text-xs opacity-50 tracking-[0.2em]">VERIFIED NODE</p>
            <p className="text-xs text-[#7CFF6B]">● ACTIVE</p>
          </div>
          <h2 className="text-6xl font-black mt-4">{storage}.00 GB</h2>
          <p className="text-white/50 mt-2">Almacenamiento verificado aportado</p>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-black/50 p-4 rounded-2xl"><p className="text-xs opacity-50">$ TOTAL</p><p className="text-2xl font-bold mt-1">$128.40</p></div>
            <div className="bg-black/50 p-4 rounded-2xl"><p className="text-xs opacity-50">ESTE MES</p><p className="text-2xl font-bold mt-1">$4.20</p></div>
            <div className="bg-black/50 p-4 rounded-2xl"><p className="text-xs opacity-50">ARCHIVOS</p><p className="text-2xl font-bold mt-1">142</p></div>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-[24px] p-6">
          <p className="text-xs opacity-50 tracking-[0.2em]">SHARDS RECIENTES</p>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between"><span className="opacity-70">Receipt.pdf.enc - 3/5</span><span className="text-[#7CFF6B]">+$0.02</span></div>
            <p className="text-xs opacity-30">hace 2h</p>
            <div className="flex justify-between mt-4"><span className="opacity-70">Video.mp4.enc - 1/5</span><span className="text-[#7CFF6B]">+$0.05</span></div>
            <p className="text-xs opacity-30">hace 5h</p>
          </div>
          <button className="w-full mt-6 bg-white text-black py-3 rounded-full font-bold">Retirar ganancias →</button>
        </div>
      </div>
    </div>
  );
}
