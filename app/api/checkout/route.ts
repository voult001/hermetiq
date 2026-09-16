import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req: NextRequest) {
  try {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      return NextResponse.json({ error: "STRIPE_SECRET_KEY missing in Vercel" }, { status: 500 })
    }
    const stripe = new Stripe(key, { apiVersion: "2024-06-20" as any })

    const { plan } = await req.json()
    
    let amount = 50
    let name = "Vaultbnb Storage - 50GB Encrypted"

    if (plan === "host") {
      amount = 999
      name = "Vaultbnb Host License - $9.99/TB"
    } else if (plan === "store" || plan === "guest") {
      amount = 50
      name = "Vaultbnb Storage - 50GB Encrypted"
    } else if (plan === "500gb") {
      amount = 500
      name = "Vaultbnb Storage - 500GB"
    } else if (plan === "1tb") {
      amount = 999
      name = "Vaultbnb Storage - 1TB"
    } else if (plan === "2tb") {
      amount = 1998
      name = "Vaultbnb Storage - 2TB"
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: { name },
          unit_amount: amount,
          recurring: { interval: "month" },
        },
        quantity: 1,
      }],
      success_url: "https://vaultbnb.com/success",
      cancel_url: "https://vaultbnb.com/store",
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
