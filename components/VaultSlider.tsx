"use client"
import { useState } from "react"
import { createPackage } from "@/lib/vaultEngine"

const BLOCK = 50;

export function VaultSlider() {
  const [size, setSize] = useState(250);
  const [showPay, setShowPay] = useState(false);

  const price = (size * 0.15).toFixed(0); // change to your price
  const blocks = size / BLOCK;
  const tb = (size/1000).toFixed(2);

  const handleSelect = () => {
    const pkg = createPackage(size, Number(price));
    console.log("Pending package:", pkg);
    setShowPay(true);
  }

  const handlePay = () => {
    // goes to checkout, payment=true triggers authorizeAndFragment in webhook
    window.location.href = `/store/checkout?size=${size}&price=${price}`;
  }

  return (
    <div className="p-6 bg-black rounded-2xl text-white border border-zinc-800">
      <div className="flex gap-2 mb-4 text-xs">
        <span className="px-3 py-1 bg-white text-black rounded-full font-bold">{size} GB</span>
        <span className="px-3 py-1 bg-zinc-800 rounded-full">{tb} TB</span>
        <span className="px-3 py-1 bg-zinc-800 rounded-full">{blocks} blocks</span>
      </div>

      <input 
        type="range" min={50} max={1000} step={50}
        value={size}
        onChange={(e) => { setSize(Number(e.target.value)); setShowPay(false); }}
        className="w-full accent-white"
      />

      <div className="flex justify-between mt-2">
        <span className="text-xs text-zinc-500">50GB</span>
        <span className="text-2xl font-bold">{size}GB WHOLE</span>
        <span className="text-xs text-zinc-500">1000GB</span>
      </div>

      {!showPay ? (
        <button onClick={handleSelect} className="w-full mt-6 py-3 bg-zinc-800 text-white rounded-full font-bold">
          Select {size}GB Vault
        </button>
      ) : (
        <button onClick={handlePay} className="w-full mt-6 py-4 bg-white text-black rounded-full font-black text-lg">
          💳 PAY NOW - ${price} for {size}GB
        </button>
      )}
      {showPay && <p className="text-center text-xs text-zinc-400 mt-2">Authorize only after payment = true</p>}
    </div>
  )
}
