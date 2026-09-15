import { Button } from "@/components/ui/button"
import { Check, HardDrive, Database } from "lucide-react"
import Link from "next/link"

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
              <p className="font-mono text-sm text-muted-foreground">14TB+</p>
              <p className="mt-2 font-mono text-3xl font-bold text-foreground">
                $67<span className="text-base font-normal text-muted-foreground">/mo</span>
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/40 p-5">
              <p className="font-mono text-sm text-muted-foreground">Earning</p>
              <p className="mt-2 font-mono text-3xl font-bold text-foreground">$120+</p>
            </div>
          </div>

          <ul className="mt-8 space-y-3">
            <li className="flex items-center gap-2 font-mono text-sm"><Check className="h-4 w-4 text-neon" /> Turn spare space into income</li>
            <li className="flex items-center gap-2 font-mono text-sm"><Check className="h-4 w-4 text-neon" /> Automated payouts</li>
            <li className="flex items-center gap-2 font-mono text-sm"><Check className="h-4 w-4 text-neon" /> Zero maintenance</li>
          </ul>

          {/* THIS IS THE BAR YOU WANTED - NOW REDIRECTS TO SIGN IN */}
          <Link href="/signin?next=/host" className="mt-auto pt-8 block">
            <Button className="w-full bg-[#39FF14] text-black hover:bg-[#32e612] font-mono text-[13px] py-6 rounded-[12px]">
              Become a Host
            </Button>
          </Link>
        </div>

        {/* Guests */}
        <div className="flex flex-col rounded-2xl border border-border bg-card p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary">
              <Database className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Guests</h3>
              <p className="font-mono text-xs tracking-wider text-muted-foreground">Secure & cheaper</p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-secondary/40 p-5">
            <p className="font-mono text-sm text-muted-foreground">Storage</p>
            <p className="mt-2 font-mono text-3xl font-bold">250GB - 2TB slider</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">50% cheaper than S3</p>
          </div>

          <ul className="mt-8 space-y-3">
            <li className="flex items-center gap-2 font-mono text-sm"><Check className="h-4 w-4" /> Encrypted sharding</li>
            <li className="flex items-center gap-2 font-mono text-sm"><Check className="h-4 w-4" /> Nearest vaults</li>
            <li className="flex items-center gap-2 font-mono text-sm"><Check className="h-4 w-4" /> Pay as you grow</li>
          </ul>

          <Link href="/signin?next=/store" className="mt-auto pt-8 block">
            <Button variant="outline" className="w-full font-mono text-[13px] py-6 rounded-[12px]">
              Start Storing
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
