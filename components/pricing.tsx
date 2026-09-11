import { Button } from "@/components/ui/button"
import { Check, HardDrive, Database } from "lucide-react"

export function Pricing() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <div className="mb-14 text-center">
        <span className="font-mono text-xs tracking-[0.25em] text-neon">// PRICING</span>
        <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
          Earn as a host. Pay less as a guest.
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Hosts */}
        <div className="flex flex-col rounded-2xl border border-neon/30 bg-card p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-neon/25 bg-neon-dim">
              <HardDrive className="h-5 w-5 text-neon" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Hosts</h3>
              <p className="font-mono text-xs tracking-wider text-muted-foreground">Plug in and grow</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/40 p-5">
              <p className="font-mono text-sm text-muted-foreground">14TB</p>
              <p className="mt-2 font-mono text-3xl font-bold text-foreground">
                $67<span className="text-base font-normal text-muted-foreground">/mo</span>
              </p>
            </div>
            <div className="relative rounded-xl border border-neon/40 bg-neon-dim p-5">
              <span className="absolute right-3 top-3 rounded-full bg-neon px-2 py-0.5 font-mono text-[10px] font-semibold text-primary-foreground">
                POPULAR
              </span>
              <p className="font-mono text-sm text-muted-foreground">56TB</p>
              <p className="mt-2 font-mono text-3xl font-bold text-neon text-glow">
                $268<span className="text-base font-normal text-muted-foreground">/mo</span>
              </p>
            </div>
          </div>

          <ul className="mt-6 flex-1 space-y-3 text-sm text-muted-foreground">
            {["Plug and grow — scale capacity anytime", "5TB/day bandwidth cap included", "Auto-pause at 80% disk usage"].map(
              (f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-neon" aria-hidden="true" />
                  {f}
                </li>
              ),
            )}
          </ul>

          <Button className="mt-8 h-12 bg-neon font-mono text-sm font-semibold tracking-wide text-primary-foreground hover:bg-neon/90">
            Become a Host
          </Button>
        </div>

        {/* Guests */}
        <div className="flex flex-col rounded-2xl border border-border bg-card p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary">
              <Database className="h-5 w-5 text-neon" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Guests</h3>
              <p className="font-mono text-xs tracking-wider text-muted-foreground">Infinite drive</p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-secondary/40 p-5">
            <p className="font-mono text-sm text-muted-foreground">Pay as you store</p>
            <p className="mt-2 font-mono text-4xl font-bold text-neon text-glow">
              $0.005<span className="text-base font-normal text-muted-foreground">/GB</span>
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-xl border border-border p-4">
            <div>
              <p className="font-mono text-xs tracking-wider text-muted-foreground">VAULTBNB</p>
              <p className="font-mono text-lg font-bold text-neon">$0.005/GB</p>
            </div>
            <span className="font-mono text-xs text-muted-foreground">vs</span>
            <div className="text-right">
              <p className="font-mono text-xs tracking-wider text-muted-foreground">AWS S3</p>
              <p className="font-mono text-lg font-bold text-muted-foreground line-through">$0.023/GB</p>
            </div>
          </div>

          <ul className="mt-6 flex-1 space-y-3 text-sm text-muted-foreground">
            {["4.6× cheaper than standard S3", "Effectively infinite drive", "No egress lock-in"].map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-neon" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>

          <Button
            variant="outline"
            className="mt-8 h-12 border-neon/30 bg-transparent font-mono text-sm font-semibold tracking-wide text-foreground hover:bg-neon-dim hover:text-neon"
          >
            Start Storing
          </Button>
        </div>
      </div>
    </section>
  )
}
