import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-neon/30 bg-neon-dim">
            <Lock className="h-4 w-4 text-neon" aria-hidden="true" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-mono text-lg font-bold tracking-widest text-foreground">VAULTBNB</span>
            <span className="font-mono text-[10px] tracking-[0.25em] text-neon">616TB</span>
          </div>
        </div>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Trust indicators">
          <span className="rounded-full border border-neon/25 bg-neon-dim px-3 py-1 font-mono text-xs tracking-wider text-neon">
            ENCRYPTED
          </span>
          <span className="rounded-full border border-border px-3 py-1 font-mono text-xs tracking-wider text-muted-foreground">
            &amp; BLIND
          </span>
        </nav>

        <Button
          size="sm"
          className="bg-neon font-mono text-xs font-semibold tracking-wide text-primary-foreground hover:bg-neon/90"
        >
          Launch Console
        </Button>
      </div>
    </header>
  )
}
