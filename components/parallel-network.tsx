export default function ParallelNetwork() {
  return (
    <section className="py-20 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs tracking-widest opacity-50 mb-4">// PARALLEL NETWORK</p>
        <h2 className="text-4xl font-bold mb-8">Redundant by design.<br/>Parallel by nature.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-white/10 bg-white/[0.03]">
            <div className="h-2 w-2 rounded-full bg-[#00FF00] animate-pulse mb-4" />
            <h3 className="font-bold">Sharded Uploads</h3>
            <p className="text-sm opacity-60 mt-2">Your data is split into encrypted shards and scattered across independent hosts. No host sees the full picture.</p>
          </div>
          <div className="p-6 rounded-xl border border-white/10 bg-white/[0.03]">
            <div className="h-2 w-2 rounded-full bg-[#00FF00] animate-pulse mb-4" />
            <h3 className="font-bold">Live Replication</h3>
            <p className="text-sm opacity-60 mt-2">Each shard is replicated x3. If a host goes offline, HQ instantly re-routes to the next fastest tier.</p>
          </div>
          <div className="p-6 rounded-xl border border-white/10 bg-white/[0.03]">
            <div className="h-2 w-2 rounded-full bg-[#00FF00] animate-pulse mb-4" />
            <h3 className="font-bold">Instant Retrieval</h3>
            <p className="text-sm opacity-60 mt-2">Download reassembles shards client-side. Only you hold the keys to put it back together.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
