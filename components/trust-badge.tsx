import { EyeOff, ServerCog, GaugeCircle } from "lucide-react"

const points = [
  {
    icon: EyeOff,
    title: "Hosts are blind",
    desc: "Hosts cannot read your data even if they wanted to. They only ever hold encrypted, keyless shards.",
  },
  {
    icon: ServerCog,
    title: "HSM-backed keys",
    desc: "Key operations run inside hardware security modules. No plaintext key ever touches host disk.",
  },
  {
    icon: GaugeCircle,
    title: "Guardrails on",
    desc: "Bandwidth caps at 5TB/day per host, and nodes auto-pause at 80% disk usage to protect your machine.",
  },
]

export function TrustBadge() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-card/40 grid-bg">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon-dim px-4 py-1.5 font-mono text-xs font-semibold tracking-[0.2em] text-neon">
            ZERO-KNOWLEDGE
          </span>
          <h2 className="mt-6 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            We can&apos;t read your data. Neither can anyone else.
          </h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {points.map((p) => (
            <div key={p.title} className="bg-card p-7">
              <p.icon className="h-6 w-6 text-neon" aria-hidden="true" />
              <h3 className="mt-4 font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
