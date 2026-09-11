import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { FeatureCards } from "@/components/feature-cards"
import { TrustBadge } from "@/components/trust-badge"
import { Pricing } from "@/components/pricing"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <FeatureCards />
        <TrustBadge />
        <Pricing />
      </main>
      <SiteFooter />
    </div>
  )
}
