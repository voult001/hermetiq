import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <SiteHeader />

      {/* CONTENEDOR CENTRADO Y ESTRECHO - ESTO ARREGLA EL FORMATO */}
      <div className="flex-1 flex items-center justify-center p-6 bg-black">
        <section className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 rounded-[24px] overflow-hidden border border-white/10 shadow-2xl">

          {/* LADO 1 */}
          <div className="flex flex-col justify-center p-10 md:p-12 bg-[#0A0A0A] border-b md:border-b-0 md:border-r border-white/10">
            <h1 className="text-4xl md:text-[44px] font-bold tracking-tight leading-[0.95]">
              Not a cloud.<br />A Silo.
            </h1>
            <p className="mt-4 text-[14px] text-white/60 max-w-[300px] leading-relaxed">
              S3 charges $23 and sees your data. Your Silo is much cheaper and even SIGILLUQ can't open it. Zero-Knowledge.
            </p>
            <a href="/signup?role=silo" className="mt-6 inline-flex w-fit bg-[#4ADE80] text-black px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#22c55e] transition">
              Create Your Silo
            </a>
          </div>

          {/* LADO 2 */}
          <div className="flex flex-col justify-center p-10 md:p-12 bg-[#111111]">
            <h2 className="text-3xl md:text-[32px] font-bold tracking-tight leading-[0.95]">
              Turn Your Extra Terabytes Into Cash
            </h2>
            <p className="mt-4 text-[14px] text-white/60 max-w-[300px] leading-relaxed">
              Rent the TBs you don't use. Monthly payouts.
            </p>
            <a href="/signup?role=host" className="mt-6 inline-flex w-fit border border-[#4ADE80] text-[#4ADE80] px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#4ADE80]/10 transition">
              Become a Host
            </a>
          </div>

        </section>
      </div>

      <SiteFooter />
    </main>
  )
}
