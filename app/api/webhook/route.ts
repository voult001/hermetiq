import { authorizeAndFragment, getNearestVaults } from "@/lib/vaultEngine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.type === "checkout.session.completed") {
      const session = body.data.object;
      const totalGB = parseInt(session.metadata?.totalGB || "250");
      const vaults = [
        { id: "vault_greenacres_01", lat: 26.1224, lng: -80.1373, city: "Greenacres" },
        { id: "vault_wpb_02", lat: 26.7153, lng: -80.0534, city: "West Palm" },
      ];
      const nearest = getNearestVaults(26.1224, -80.1373, vaults);
      const pending = {
        packageId: session.id,
        totalGB,
        displaySize: `${totalGB}GB`,
        price: session.amount_total / 100,
        status: 'pending_payment' as const,
        shards: Array.from({ length: totalGB/50 }).map((_, i) => ({
          shardId: i, size: 50, vaultId: 'pending_payment'
        }))
      };
      const authorized = authorizeAndFragment(pending, nearest);
      return new Response(JSON.stringify({ ok: true, authorized }), { status: 200 });
    }
    return new Response("ok", { status: 200 });
  } catch (e) {
    return new Response("error", { status: 500 });
  }
}
