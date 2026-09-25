import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/hero"
import { FeatureCards } from "@/components/feature-cards"
import Pricing from "@/components/pricing"
import ParallelNetwork from "@/components/parallel-network"

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      <SiteHeader />
      <Hero />
      <FeatureCards />
      <ParallelNetwork />
      <Pricing />
      <SiteFooter />
    </main>
  )
}
