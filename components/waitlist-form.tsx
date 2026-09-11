"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvkolbly"

const TB_OPTIONS = ["14", "56", "500"] as const

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [tbs, setTbs] = useState<string>("56")
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email.trim()) return

    setStatus("submitting")
    setError("")

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, tbs }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        const message = data?.errors?.map((x: { message: string }) => x.message).join(", ")
        throw new Error(message || "Something went wrong. Please try again.")
      }

      setStatus("success")
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    }
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-md">
      {status === "success" ? (
        <div
          className="flex flex-col items-center gap-1 rounded-lg border border-neon/40 bg-neon-dim px-4 py-3"
          role="status"
          aria-live="polite"
        >
          <p className="flex items-center justify-center gap-2 font-mono text-sm font-semibold tracking-wide text-neon">
            <Check className="h-4 w-4" aria-hidden="true" />
            {"You're in! #1,247 on list"}
          </p>
          <p className="font-mono text-xs text-muted-foreground">{email}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="waitlist-email" className="sr-only">
              Email for early access
            </label>
            <input
              id="waitlist-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email for early access"
              className="h-12 flex-1 rounded-md border border-neon/30 bg-black px-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon"
            />
            <Button
              type="submit"
              size="lg"
              disabled={status === "submitting"}
              className="h-12 border border-neon bg-black px-6 font-mono text-sm font-semibold tracking-wide text-neon hover:bg-neon-dim disabled:opacity-60 sm:w-auto"
            >
              {status === "submitting" ? "Joining..." : "Join Waitlist"}
            </Button>
          </div>

          <fieldset className="flex items-center justify-center gap-2">
            <legend className="sr-only">Storage size in TB</legend>
            {TB_OPTIONS.map((tb) => {
              const active = tbs === tb
              return (
                <button
                  key={tb}
                  type="button"
                  onClick={() => setTbs(tb)}
                  aria-pressed={active}
                  className={`h-9 flex-1 rounded-md border px-3 font-mono text-xs font-semibold tracking-wide transition-colors ${
                    active
                      ? "border-neon bg-neon-dim text-neon"
                      : "border-neon/30 bg-black text-muted-foreground hover:border-neon/60 hover:text-neon"
                  }`}
                >
                  {tb}TB
                </button>
              )
            })}
          </fieldset>

          {status === "error" && (
            <p className="text-center font-mono text-xs text-red-400" role="alert">
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  )
}
