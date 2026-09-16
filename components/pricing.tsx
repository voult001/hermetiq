import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req: NextRequest) {
  try {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) return NextResponse.json({ error: "STRIPE_SECRET_KEY missing in Vercel env" }, { status: 500 })
    const stripe = new Stripe(key, { apiVersion: "2024-06-20" as any })
    const { plan } = await req.json()
    const isHost = plan === "host"
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price_data: { currency: "usd", product_data: { name: isHost? "Vaultbnb Host License" : "Vaultbnb Storage 50GB" }, unit_amount: isHost? 999 : 50, recurring: { interval: "month" } }, quantity: 1 }],
      success_url: "https://vaultbnb.com/success",
      cancel_url: "https://vaultbnb.com/",
    })
    return NextResponse.json({ url: session.url })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
