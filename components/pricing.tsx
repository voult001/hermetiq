  async function goStripe(plan: string) {
    setLoading(plan)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        console.log("Checkout failed:", data)
        alert(data.error || "Checkout not configured yet. Add STRIPE_SECRET_KEY in Vercel.")
        return
      }
    } catch (e) {
      console.error(e)
      alert("Stripe checkout API not ready - add STRIPE_SECRET_KEY in Vercel → Settings → Environment Variables")
    }
    setLoading("")
  }
