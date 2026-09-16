import Link from "next/link"
import { Check, Database, HardDrive } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Pricing() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid gap-8 md:grid-cols-2">

        {/* Hosts */}
        <div className="flex flex-col rounded-2xl border border-border bg-card p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary">
              <HardDrive className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Hosts</h3>
              <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Earn passive income</p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-secondary/40 p-5">
            <p className="font-mono text-sm text-muted-foreground">Earnings</p>
            <p className="mt-2 font-mono text-3xl font-bold">$10 / TB / mo</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">70% revenue share</p>
          </div>

          <ul className="mt-8 space-y-3">
            <li className="flex items-center gap-2 font-mono text-sm"><Check className="h-4 w-4" /> One-click vault setup</li>
            <li className="flex items-center gap-2 font-mono text-sm"><Check className="h-4 w-4" /> Automated payouts</li>
            <li className="flex items-center gap-2 font-mono text-sm"><Check className="h-4 w-4" /> Enterprise-grade security</li>
          </ul>

          <Link href="/host" className="mt-auto pt-8 block">
            <Button className="w-full font-mono text-[13px] py-6 rounded-[12px]">
              Become a Host
            </Button>
          </Link>
        </div>

        {/* Guests - OPTION C FINAL PRO */}
        <div className="flex flex-col rounded-2xl border border-border bg-card p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary">
              <Database className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Guests</h3>
              <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Secure & cheaper</p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-secondary/40 p-5">
            <p className="font-mono text-sm text-muted-foreground">Storage</p>
            <p className="mt-2 font-mono text-3xl font-bold">50GB - 2TB</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">50% cheaper than S3</p>
          </div>

          <ul className="mt-8 space-y-3">
            <li className="flex items-center gap-2 font-mono text-sm"><Check className="h-4 w-4" /> Military-grade AES-256 end-to-end encryption</li>
            <li className="flex items-center gap-2 font-mono text-sm"><Check className="h-4 w-4" /> 50% less than S3, Dropbox & Google Drive</li>
            <li className="flex items-center gap-2 font-mono text-sm"><Check className="h-4 w-4" /> Enterprise-grade redundancy & global availability</li>
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
