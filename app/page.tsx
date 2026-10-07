import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <SiteHeader />
      <div className="flex-1 flex items-center justify-center p-6">
        <section className="w-full max-w-[850px] grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-white/10">

          <div className="flex flex-col p-8 bg-[#0A0A0A] border-b md:border-b-0 md:border-r border-white/10">
            <div className="flex-1">
              <h1 className="text-4xl font-bold leading-[0.9]">Not a cloud.<br/>A Silo.</h1>
              <p className="mt-4 text-sm text-white/60">S3 charges $23 and sees your data. Your Silo is much cheaper and even SIGILLUQ can't open it. Zero-Knowledge.</p>
            </div>
            <a href="/signup?role=silo" className="mt-8 w-fit bg-[#4ADE80] text-black px-6 py-3 rounded-full text-sm font-bold">Create Your Silo</a>
          </div>

          <div className="flex flex-col p-8 bg-[#111]">
            <div className="flex-1">
              <h2 className="text-2xl font-bold leading-tight">Turn Your Extra Terabytes Into Cash</h2>
              <p className="mt-4 text-sm text-white/60">Rent the TBs you don't use. Monthly payouts.</p>
            </div>
            <a href="/signup?role=host" className="mt-8 w-fit border border-[#4ADE80] text-[#4ADE80] px-6 py-3 rounded-full text-sm font-bold">Become a Host</a>
          </div>

        </section>
      </div>
      <SiteFooter />
    </main>
  )
}
