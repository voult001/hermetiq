import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"
import { authorizeAndFragment, createPackage } from "@/lib/vaultEngine"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { 
  apiVersion: "2024-06-20" as any 
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const sig = req.headers.get('stripe-signature')
    
    if (!sig) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    // VERIFICACION REAL DE STRIPE - OBLIGATORIO
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(
        body, 
        sig, 
        process.env.STRIPE_WEBHOOK_SECRET!
      )
    } catch (err: any) {
      console.error('Webhook signature error:', err.message)
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session
      
      // SOLO DESPUES DE PAGO=TRUE - SELL WHOLE
      const sellableGB = parseInt(session.metadata?.sellableGB || session.metadata?.totalGB || "50")
      const userId = session.metadata?.userId
      const userLat = parseFloat(session.metadata?.userLat || "0")
      const userLng = parseFloat(session.metadata?.userLng || "0")
      const price = (session.amount_total || 0) / 100

      if (!userLat || !userLng) {
        console.warn('No location in metadata, using default')
      }

      // 1. FETCH VAULTS REALES DE SUPABASE - NO HARDCODED
      const { data: vaults, error } = await supabase
        .from('hosts')
        .select('*')
        .eq('online', true)
        .gt('freeGB', 50)

      if (error) throw error
      if (!vaults || vaults.length < 15) {
        console.error(`Faltan vaults: necesitas 15, hay ${vaults?.length || 0}`)
        // Guardar para retry manual
      }

      // 2. CREAR PACKAGE PENDING
      const pending = createPackage(sellableGB, price)
      pending.packageId = session.id

      // 3. FRAGMENT INTERNALLY - SOLO AHORA - CON UBICACION REAL
      const authorized = authorizeAndFragment(
        pending, 
        vaults as any, 
        { lat: userLat, lng: userLng }
      )

      // 4. GUARDAR AUTORIZADO EN SUPABASE
      const { error: insertError } = await supabase
        .from('allocations')
        .insert({
          package_id: authorized.packageId,
          user_id: userId,
          total_gb: authorized.totalGB,
          raw_gb: authorized.rawGB,
          price: authorized.price,
          status: 'authorized', // YA PAGADO
          shards: authorized.shards,
          stripe_session_id: session.id,
          client_lat: userLat,
          client_lng: userLng,
          created_at: new Date().toISOString()
        })

      if (insertError) throw insertError

      console.log(`✅ SIGILLIQ V2: ${sellableGB}GB autorizado -> ${authorized.shards.length} shards -> 15 hosts`)
      
      return NextResponse.json({ 
        ok: true, 
        authorized: authorized.packageId,
        shards: authorized.shards.length 
      })
    }

    return NextResponse.json({ received: true })

  } catch (e: any) {
    console.error('WEBHOOK V2 ERROR:', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
