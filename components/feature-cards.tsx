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
    <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <div className="mb-14 max-w-2xl">
        <span className="font-mono text-xs tracking-[0.25em] text-neon">// HOW IT WORKS</span>
        <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
          Architecture built to be blind
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {cards.map((c) => (
          <article
            key={c.n}
            className="group relative flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-neon/40"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-neon/25 bg-neon-dim">
                <c.icon className="h-5 w-5 text-neon" aria-hidden="true" />
              </div>
              <span className="font-mono text-sm text-muted-foreground">{c.n}</span>
            </div>

            <h3 className="mt-6 text-xl font-semibold">{c.title}</h3>
            <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">{c.desc}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {c.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-[11px] tracking-wide text-neon"
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
