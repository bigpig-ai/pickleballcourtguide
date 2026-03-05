import { NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not configured");
  return new Stripe(key);
}

const PLAN_PRICES: Record<string, { amount: number; name: string }> = {
  basic: { amount: 2900, name: "Claim Your Court – Basic" },
  pro: { amount: 9900, name: "Claim Your Court – Pro" },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { courtName, courtCity, ownerName, ownerEmail, plan } = body;

    if (!courtName || !courtCity || !ownerName || !ownerEmail || !plan) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const planConfig = PLAN_PRICES[plan];
    if (!planConfig) {
      return NextResponse.json(
        { error: "Invalid plan selected." },
        { status: 400 }
      );
    }

    const origin =
      request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "";

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: ownerEmail,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: planConfig.name,
              description: `Monthly subscription for ${courtName} in ${courtCity}`,
            },
            unit_amount: planConfig.amount,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      metadata: {
        courtName,
        courtCity,
        ownerName,
        ownerEmail,
        plan,
      },
      success_url: `${origin}/claim/success`,
      cancel_url: `${origin}/claim`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("Stripe checkout error:", err);
    const message =
      err instanceof Error ? err.message : "Failed to create checkout session.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
