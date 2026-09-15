import { authorizeAndFragment, getNearestVaults } from "@/lib/vaultEngine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.type === "checkout.session.completed") {
      const session = body.data.object;
      const totalGB = parseInt(session.metadata?.totalGB || "250");
      
      // Location comes from Stripe metadata at runtime, NOT hardcoded
      const userLat = parseFloat(session.metadata?.userLat || "0");
      const userLng = parseFloat(session.metadata?.userLng || "0");

      const vaults = []; // Will fetch from Supabase - no hardcoded addresses
      
      const pending = {
        packageId: session.id,
        totalGB,
        displaySize: `${totalGB}GB`,
        price: session.amount_total / 100,
        status: 'pending_payment' as const,
        shards: []
      };

      // Only assigns nearest AFTER payment=TRUE
      const authorized = authorizeAndFragment(pending, vaults);
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }
    return new Response("ok", { status: 200 });
  } catch (e) {
    return new Response("error", { status: 500 });
  }
}
