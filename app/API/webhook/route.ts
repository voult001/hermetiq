// app/api/webhook/route.ts - FINAL LOCK
import { authorizeAndFragment, getNearestVaults } from "@/lib/vaultEngine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (body.type === "checkout.session.completed") {
      const session = body.data.object;
      const totalGB = parseInt(session.metadata?.totalGB || "250");
      const userLat = parseFloat(session.metadata?.userLat || "26.1224");
      const userLng = parseFloat(session.metadata?.userLng || "-80.1373");

      console.log(`💰 PAYMENT=TRUE for ${totalGB}GB - AUTHORIZING...`);

      // Fetch from Supabase later - mock for now
      const vaults = [
        { id: "vault_greenacres_01", lat: 26.1224, lng: -80.1373, city: "Greenacres" },
        { id: "vault_wpb_02", lat: 26.7153, lng: -80.0534, city: "West Palm" },
        { id: "vault_miami_03", lat: 25.7617, lng: -80.1918, city: "Miami" },
      ];

      const nearest = getNearestVaults(userLat, userLng, vaults);

      const pending = {
        packageId: session.id,
        totalGB,
        displaySize: `${totalGB}GB`,
        price: session.amount_total / 100,
        status: 'pending_payment' as const,
        shards: Array.from({ length: totalGB/50 }).map((_, i) => ({
          shardId: i,
          size: 50,
          vaultId: 'pending_payment'
        }))
      };

      const authorized = authorizeAndFragment(pending, nearest);
      
      // TODO: Insert into Supabase here
      console.log("✅ AUTHORIZED:", authorized);

      return new Response(JSON.stringify({ ok: true, authorized }), { status: 200 });
    }

    return new Response("ok", { status: 200 });
  } catch (e) {
    return new Response("webhook error", { status: 500 });
  }
}
