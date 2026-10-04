import { ShieldCheck, Cpu, Waves } from "lucide-react"

const cards = [
  {
    n: "01",
    icon: ShieldCheck,
    title: "Client-side crypto",
    desc: "Every byte is encrypted on your device with AES-256-GCM before it ever leaves. Keys are split via Shamir's Secret Sharing into a 2-of-3 scheme — no single node can reconstruct your data.",
    tags: ["AES-256-GCM", "Shamir 2-of-3"],
  },
  {
    n: "02",
    icon: Cpu,
    title: "HQ scoring engine",
    desc: "Our headquarters AI scores every host in real time as freeSpace × speed × uptime, then ranks them into performance tiers so your shards always land on the fastest, most reliable drives.",
    tags: ["Tier S / A / B", "freeSpace·speed·uptime"],
  },
  {
    n: "03",
    icon: Waves,
    title: "Noise-filled vaults",
    desc: "Vaults store encrypted noise as spillover, masking real usage patterns and pre-provisioning capacity. The result is an effectively infinite drive that grows the moment you need it.",
    tags: ["Spillover noise", "Infinite drive"],
  },
]

export function FeatureCards() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 py-16">
      <div className="mb-8 max-w-2xl">
        <span className="text-[10px] tracking-[0.25em] text-zinc-600">// HOW IT WORKS</span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
          Architecture built to be blind
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <article
            key={c.n}
            className="flex flex-col rounded-[24px] border border-zinc-800 bg-[#111] p-8 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#39FF14]/20 bg-[#39FF14]/10">
                <c.icon className="h-5 w-5 text-[#39FF14]" aria-hidden="true" />
              </div>
              <span className="text-sm text-zinc-600">{c.n}</span>
            </div>

            <h3 className="mt-6 text-xl font-bold">{c.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{c.desc}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {c.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-zinc-800 bg-black px-3 py-1 text-[11px] tracking-wide text-zinc-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
