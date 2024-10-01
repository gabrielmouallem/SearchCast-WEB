import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16", // Use the latest API version
});

const DEV_STRIPE_PLANS_LINE_ITEMS = {
  month: {
    price: "price_1PfmJPAvzLrWK4UoMHHjVuoH",
    quantity: 1,
  },
  semester: {
    price: "price_1PfmKjAvzLrWK4UoKB8bkIsj",
    quantity: 1,
  },
  year: {
    price: "price_1PfmLCAvzLrWK4UoGdAuFtEI",
    quantity: 1,
  },
};

const PROD_STRIPE_PLANS_LINE_ITEMS = {
  month: {
    price: "price_1PfmRWAvzLrWK4UoeDD4Kp9k",
    quantity: 1,
  },
  semester: {
    price: "price_1PfmRRAvzLrWK4UowA3jhbCL",
    quantity: 1,
  },
  year: {
    price: "price_1PfmRPAvzLrWK4Uog9sgtVb5",
    quantity: 1,
  },
};

export async function POST(request: Request) {
  try {
    const { subscription_type, customer_email } = await request.json();
    const origin = request.headers.get("origin") || "";

    if (!subscription_type || !customer_email) {
      return NextResponse.json(
        { error: "Subscription type and customer email are required" },
        { status: 400 },
      );
    }

    const isProd = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
    const STRIPE_PLANS_LINE_ITEMS = isProd
      ? PROD_STRIPE_PLANS_LINE_ITEMS
      : DEV_STRIPE_PLANS_LINE_ITEMS;

    if (
      !STRIPE_PLANS_LINE_ITEMS[
        subscription_type as keyof typeof STRIPE_PLANS_LINE_ITEMS
      ]
    ) {
      return NextResponse.json(
        { error: "Invalid subscription type" },
        { status: 400 },
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        STRIPE_PLANS_LINE_ITEMS[
          subscription_type as keyof typeof STRIPE_PLANS_LINE_ITEMS
        ],
      ],
      customer_email: customer_email,
      mode: "subscription",
      success_url: `${origin}/search`,
      cancel_url: `${origin}/plans`,
    });

    console.log(
      `${customer_email} - started the checkout session using the ${subscription_type} plan`,
    );
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the checkout session" },
      { status: 500 },
    );
  }
}
