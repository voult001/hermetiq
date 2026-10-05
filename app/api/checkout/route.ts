import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { getRawFromSellable } from "@/lib/vaultEngine" // ESTE IMPORT SOLO SI VAULTENGINE ESTÁ EN PRIVADO - Si lo tienes público, quítalo

export async function POST(req: NextRequest) {
  try {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      return NextResponse.json({ error: "STRIPE_SECRET_KEY missing in Vercel" }, { status: 500 })
    }
    const stripe = new Stripe(key, { apiVersion: "2024-06-20" as any })

    const { plan, userId, clientLat, clientLng } = await req.json()
    
    let amount = 50 // en centavos
    let name = "Vaultbnb Storage - 50GB Encrypted"
    let sellableGB = 50
    let displayPrice = 0.50

    if (plan === "host") {
      amount = 999
      name = "Vaultbnb Host License - $9.99/TB"
      sellableGB = 1000 // 1TB licencia host
    } else if (plan === "store" || plan === "guest" || plan === "50gb") {
      amount = 50
      name = "Vaultbnb Storage - 50GB Encrypted"
      sellableGB = 50
    } else if (plan === "500gb") {
      amount = 500
      name = "Vaultbnb Storage - 500GB"
      sellableGB = 500
    } else if (plan === "1tb") {
      amount = 999
      name = "Vaultbnb Storage - 1TB"
      sellableGB = 1000
    } else if (plan === "2tb") {
      amount = 1998
      name = "Vaultbnb Storage - 2TB"
      sellableGB = 2000
    }

    // V2 - SELL WHOLE, FRAGMENT INTERNALLY
    // No exponemos rawGB ni 1.5 al frontend. Solo lo guardamos en metadata para el webhook
    const rawGB = sellableGB * 1.5 // Solo en servidor

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
      // ESTO ES LO QUE TE FALTABA JEFE - PARA AUTORIZAR SOLO DESPUÉS DE PAGO
      metadata: {
        userId: userId || 'guest',
        sellableGB: String(sellableGB),
        rawGB: String(rawGB),
        plan,
        status: 'pending_payment', // IMPORTANTE: no autorizar hasta webhook
        clientLat: String(clientLat || 0),
        clientLng: String(clientLng || 0),
      },
      success_url: `https://vaultbnb.com/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
      cancel_url: "https://vaultbnb.com/store",
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('CHECKOUT ERROR:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
