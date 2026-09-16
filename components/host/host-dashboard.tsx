"use client"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export function HostDashboard() {
  const [totalGB, setTotalGB] = useState(0)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase.from("hosts").select("*")
      if (data) {
        let sum = 0
        for (const r of data) {
          sum += Number((r as any).freeGB || (r as any).free_gb || 0)
        }
        setTotalGB(sum)
      }
    }
    load()
  }, [])

  const tb = (totalGB / 1000).toFixed(1) + " TB"

  return (
    <div style={{ padding: 24, borderLeft: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)" }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Host Dashboard</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{tb}</div>
          <div style={{ fontSize: 12, opacity: 0.5 }}>Shared</div>
        </div>
        <div style={{ padding: 16, borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>99.2%</div>
          <div style={{ fontSize: 12, opacity: 0.5 }}>Uptime</div>
        </div>
        <div style={{ padding: 16, borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>5.0</div>
          <div style={{ fontSize: 12, opacity: 0.5 }}>Rating</div>
        </div>
        <div style={{ padding: 16, borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>3</div>
          <div style={{ fontSize: 12, opacity: 0.5 }}>Active Deals</div>
        </div>
      </div>

      <div style={{ fontSize: 12, fontFamily: "monospace", opacity: 0.4 }}>
        {totalGB} GB total from Supabase hosts table
      </div>
    </div>
  )
}
