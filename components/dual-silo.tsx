"use client"

export function DualSilo() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh] border-t border-white/10">
      <div className="flex flex-col justify-center p-10 md:p-20 border-b md:border-b-0 md:border-r border-white/10 bg-[#0A0A0A]">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.9]">
          Not a cloud.<br />A Silo.
        </h1>
        <p className="mt-6 text-lg text-white/60 max-w-md">
          S3 charges $23 and sees your data. Your Silo is much cheaper and even SIGILLUQ can't open it. Zero-Knowledge.
        </p>
        <a href="/signup?role=silo" className="mt-8 inline-flex w-fit bg-[#4ADE80] text-black px-8 py-4 rounded-xl font-semibold">
          Create Your Silo
        </a>
      </div>
      <div className="flex flex-col justify-center p-10 md:p-20 bg-black">
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-[0.9]">
          Turn Your Extra Terabytes<br /><span className="text-[#4ADE80]">Into Cash</span>
        </h2>
        <p className="mt-6 text-lg text-white/60 max-w-md">
          Rent the TBs you don't use. Monthly payouts.
        </p>
        <a href="/signup?role=host" className="mt-8 inline-flex w-fit border border-[#4ADE80] text-[#4ADE80] px-8 py-4 rounded-xl font-semibold">
          Become a Host
        </a>
      </div>
    </section>
  )
}
