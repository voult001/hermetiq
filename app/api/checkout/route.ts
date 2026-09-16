import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20" as any,
});

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json();

    // Pricing: $0.01 per GB = $9.99 per TB
    // Host = $9.99, Guest 50GB = $0.50, 500GB = $5, 1TB = $9.99, 2TB = $19.98
    let amount = 50; // default 50 cents = $0.50
    let name = "Vaultbnb Storage - 50GB Encrypted";

    if (plan === "host") {
      amount = 999; // $9.99
      name = "Vaultbnb Host License - $9.99/TB";
    } else if (plan === "store" || plan === "guest") {
      amount = 50; // $0.50 for 50GB
      name = "Vaultbnb Storage - 50GB Encrypted";
    } else if (plan === "500gb") {
      amount = 500; // $5.00
      name = "Vaultbnb Storage - 500GB";
    } else if (plan === "1tb") {
      amount = 999; // $9.99
      name = "Vaultbnb Storage - 1TB";
    } else if (plan === "2tb") {
      amount = 1998; // $19.98
      name = "Vaultbnb Storage - 2TB";
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name },
            unit_amount: amount,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      success_url: "https://vaultbnb.com/success",
      cancel_url: "https://vaultbnb.com/store",
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
