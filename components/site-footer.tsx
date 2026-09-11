import { Lock } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-md border border-neon/30 bg-neon-dim">
            <Lock className="h-3.5 w-3.5 text-neon" aria-hidden="true" />
          </div>
          <span className="font-mono text-sm font-bold tracking-widest">VAULTBNB</span>
          <span className="font-mono text-xs tracking-wider text-muted-foreground">616TB · Encrypted &amp; Blind</span>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs tracking-wider text-muted-foreground">
          <span className="rounded-full border border-neon/25 bg-neon-dim px-3 py-1 text-neon">PATENT PENDING</span>
          <span>© 2026 VAULTBNB</span>
        </div>
      </div>
    </footer>
  )
}
