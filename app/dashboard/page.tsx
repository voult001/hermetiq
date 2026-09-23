import dynamic from "next/dynamic";
import SiteHeader from "@/components/site-header";
import Hero from "@/components/hero";
import TrustBadge from "@/components/trust-badge";
import Pricing from "@/components/pricing";
import SiteFooter from "@/components/site-footer";

const FeatureCards = dynamic(() => import("@/components/feature-cards"), {
  loading: () => <div className='h-40 animate-pulse bg-zinc-900 rounded-xl' />,
  ssr: false,
});

const ParallelNetwork = dynamic(() => import("@/components/parallel-network"), {
  ssr: false,
});

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <Hero />
      <FeatureCards />
      <div className="hidden">
        <ParallelNetwork />
      </div>
      <TrustBadge />
      <Pricing />
      <SiteFooter />
    </div>
  );
}
