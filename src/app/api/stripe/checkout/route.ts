import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2026-02-25.clover",
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { bundleId, amount, bundleName } = body as {
    bundleId: string;
    amount: number;
    bundleName: string;
  };

  if (!bundleId || !amount) {
    return NextResponse.json(
      { error: "Missing required fields: bundleId, amount" },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `PodBundle Campaign: ${bundleName || bundleId}`,
              description: "Podcast advertising campaign bundle",
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/dashboard/campaigns?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/dashboard/bundles?cancelled=true`,
      metadata: { bundleId },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create checkout session";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
