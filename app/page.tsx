// app/page.tsx - OPTIMIZADO PARA SIGILLUQ OS
import dynamic from "next/dynamic";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import TrustBadge from "@/components/TrustBadge";
import Pricing from "@/components/Pricing";
import SiteFooter from "@/components/SiteFooter";

// Carga pesada solo cuando hace falta - así tu landing carga en 0.3s
const FeatureCards = dynamic(() => import("@/components/FeatureCards"), {
  loading: () => <div className="h-40 animate-pulse bg-zinc-900 rounded-xl" />,
  ssr: false,
});

const ParallelNetwork = dynamic(
  () => import("@/components/parallel-network"),
  {
    ssr: false,
  }
);

export const metadata = {
  title: "SIGILLUQ | Airbnb de Datos + Uber Delivery",
  description: "Rentamos espacio vacio a $0.80/TB. Entrega paralela 1.5x segura.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <Hero />

      {/* INVENTARIO INVISIBLE - No pide nada afuera */}
      <FeatureCards />

      {/* UBER - No se ve en la landing, solo cuando sube archivo */}
      <div className="hidden">
        <ParallelNetwork />
      </div>

      <TrustBadge />
      <Pricing />
      <SiteFooter />
    </div>
  );
}
