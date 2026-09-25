"use client"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { FeatureCards } from "@/components/feature-cards"
import { TrustBadge } from "@/components/trust-badge"
import Pricing from "@/components/pricing"
import SiteFooter from "@/components/site-footer"
import ParallelNetwork from "@/components/parallel-network"

export default function Page() {
  return (
    <main className="min-h-screen bg-black">
      <SiteHeader />
      <Hero />
      <FeatureCards />
      <TrustBadge />
      <Pricing />
      <ParallelNetwork />
      <SiteFooter />
    </main>
  )
}
