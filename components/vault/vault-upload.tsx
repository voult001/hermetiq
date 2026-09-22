"use client";
import { useState } from "react";

export default function VaultUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("Idle — Encrypted $0.005/GB");
  const [shards, setShards] = useState(0);

  const handleUpload = async () => {
    if (!file) return;
    setStatus("🔐 AES-256 Encrypting...");

    // Simulate encryption + 48 shards
    for (let i = 0; i <= 48; i++) {
      setShards(i);
      await new Promise(r => setTimeout(r, 80));
      if (i === 16) setStatus("✂️ Splitting into 48 shards...");
      if (i === 32) setStatus("🔑 Shamir 2-of-3 key split...");
      if (i === 48) setStatus("✅ Distributed to 48 hosts — Quantum-safe");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-black border border-lime-400/20 rounded-2xl p-8 text-white">
      <h2 className="text-2xl font-bold text-lime-400">SIGILLUQ VAULT</h2>
      <p className="text-sm text-gray-400 mt-1">Military-grade encryption. Distributed across 616TB network.</p>

      <div className="mt-6 border-2 border-dashed border-lime-400/30 rounded-xl p-8 text-center hover:border-lime-400 transition">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-lime-400 file:text-black file:font-bold"
        />
        {file && <p className="mt-3 text-lime-300 text-sm">{file.name} — {(file.size/1024/1024).toFixed(2)} MB</p>}
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-xs text-gray-400">
          <span>Shards: {shards}/48</span>
          <span>{Math.round((shards/48)*100)}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
          <div className="bg-lime-400 h-2 rounded-full transition-all" style={{ width: `${(shards/48)*100}%` }}></div>
        </div>
      </div>

      <p className="mt-4 text-sm font-mono text-lime-300">{status}</p>

      <button
        onClick={handleUpload}
        disabled={!file}
        className="mt-6 w-full bg-lime-400 text-black font-bold py-3 rounded-full disabled:opacity-30 hover:bg-lime-300"
      >
        Encrypt & Store — $0.005/GB
      </button>

      <div className="mt-6 grid grid-cols-3 gap-3 text-[10px] text-gray-500">
        <div className="border border-white/10 rounded p-2">READ-ONLY<br/>Host cannot read</div>
        <div className="border border-white/10 rounded p-2">STOP ANYTIME<br/>No lock-in</div>
        <div className="border border-white/10 rounded p-2">2-OF-3 SHAMIR<br/>Key recovery</div>
      </div>
    </div>
  );
}
