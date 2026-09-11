import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { HostPanel } from "@/components/host/host-panel"
import { HostDashboard } from "@/components/host/host-dashboard"

export const metadata: Metadata = {
  title: "VAULTBNB Host — Desktop App",
  description: "Rent your spare drive. Earn $500/TB/year with AES-256 encrypted, read-only distributed storage.",
}

export default function HostPage() {
  return (
    <main className="vault flex min-h-svh flex-col items-center justify-center bg-[#050505] px-4 py-10">
      <div className="mb-6 flex w-full max-w-6xl items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-white/50 transition-colors hover:text-[#00ff88]"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          BACK TO SITE
        </Link>
        <span className="font-mono text-xs tracking-widest text-white/40">VAULTBNB · HOST</span>
      </div>

      <div className="w-full max-w-6xl overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl shadow-black/60">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
          <span className="ml-3 font-mono text-xs tracking-wide text-white/40">VaultBnB Host.app</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]">
          <HostPanel />
          <HostDashboard />
        </div>
      </div>
    </main>
  )
}
