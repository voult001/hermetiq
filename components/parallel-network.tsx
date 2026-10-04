export default function ParallelNetwork() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 py-16 border-t border-zinc-800">
      <div>
        <p className="text-[10px] tracking-widest text-zinc-600 mb-4">// PARALLEL NETWORK</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">Redundant by design.<br/>Parallel by nature.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-8 rounded-[24px] border border-zinc-800 bg-[#111]">
            <div className="h-2 w-2 rounded-full bg-[#39FF14] animate-pulse mb-4" />
            <h3 className="font-bold">Sharded Uploads</h3>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">Your data is split into encrypted shards and scattered across independent hosts. No host sees the full picture.</p>
          </div>
          <div className="p-8 rounded-[24px] border border-zinc-800 bg-[#111]">
            <div className="h-2 w-2 rounded-full bg-[#39FF14] animate-pulse mb-4" />
            <h3 className="font-bold">Live Replication</h3>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">Each shard is replicated x3. If a host goes offline, HQ instantly re-routes to the next fastest tier.</p>
          </div>
          <div className="p-8 rounded-[24px] border border-zinc-800 bg-[#111]">
            <div className="h-2 w-2 rounded-full bg-[#39FF14] animate-pulse mb-4" />
            <h3 className="font-bold">Instant Retrieval</h3>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">Download reassembles shards client-side. Only you hold the keys to put it back together.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
