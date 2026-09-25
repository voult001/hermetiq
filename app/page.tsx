import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { FeatureGrid } from "@/components/feature-grid"
import { HowItWorks } from "@/components/how-it-works"
import Pricing from "@/components/pricing"
import SiteFooter from "@/components/site-footer"
import ParallelNetwork from "@/components/parallel-network"

export default function Page() {
  return (
    <main className="min-h-screen bg-black">
      <SiteHeader />
      <HeroSection />
      <FeatureGrid />
      <HowItWorks />
      <Pricing />
      <ParallelNetwork />
      <SiteFooter />
    </main>
  )
}
