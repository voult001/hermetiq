import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HardDrive, Database, ArrowRight } from "lucide-react"
import { WaitlistForm } from "@/components/waitlist-form"

export function Hero() {
  return (
    <section className="relative overflow-hidden grid-bg">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-neon/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-24 text-center md:py-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-neon/25 bg-neon-dim px-4 py-1.5 font-mono text-xs tracking-wider text-neon">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon" aria-hidden="true" />
          ZERO-KNOWLEDGE DISTRIBUTED STORAGE
        </span>

        <h1 className="mx-auto mt-8 max-w-4xl text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
          Rent your spare drive. <span className="text-neon text-glow">AI stores 500TB.</span> You earn.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
          VAULTBNB turns idle disk space into an encrypted, self-healing storage grid. Hosts get paid for capacity they
          already own. Guests get an infinite drive at a fraction of cloud pricing.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group h-13 w-full bg-neon px-8 font-mono text-sm font-semibold tracking-wide text-primary-foreground hover:bg-neon/90 sm:w-auto"
          >
            <Link href="/host">
              <HardDrive className="h-4 w-4" aria-hidden="true" />
              Become a Host · Earn $268/mo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Button>
          <Button
  asChild
  size="lg"
  variant="outline"
  className="h-13 w-full border-neon/30 bg-transparent px-8 font-mono text-sm font-semi"
>
  <Link href="/store">
    <Database className="h-4 w-4" aria-hidden="true" />
    Store 500TB · $0.005/GB
  </Link>
</Button>
        </div>

        <WaitlistForm />

        <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
          {[
            { v: "616TB", l: "Live capacity" },
            { v: "2-of-3", l: "Shamir shares" },
            { v: "AES-256", l: "GCM encryption" },
            { v: "80%", l: "Auto-pause cap" },
          ].map((s) => (
            <div key={s.l} className="bg-card px-4 py-6">
              <dt className="font-mono text-2xl font-bold text-neon">{s.v}</dt>
              <dd className="mt-1 font-mono text-xs tracking-wider text-muted-foreground">{s.l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
