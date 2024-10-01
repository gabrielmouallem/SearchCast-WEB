import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16", // Use the latest API version
});

export async function POST(request: Request) {
  try {
    const { customer_email } = await request.json();

    if (!customer_email) {
      return NextResponse.json(
        { error: "Customer email is required" },
        { status: 400 },
      );
    }

    // Find the customer by email
    const customers = await stripe.customers.list({
      email: customer_email,
      limit: 1,
    });
    const customer = customers.data[0];

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 },
      );
    }

    // Find the customer's active subscription
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: "active",
      limit: 1,
    });

    const subscription = subscriptions.data[0];

    if (!subscription) {
      return NextResponse.json(
        { error: "No active subscription found" },
        { status: 404 },
      );
    }

    // Cancel the subscription at the end of the current period
    const updatedSubscription = await stripe.subscriptions.update(
      subscription.id,
      {
        cancel_at_period_end: true,
        cancellation_details: { comment: "Cancelled via backend" },
      },
    );

    console.log(
      `${customer_email} - cancelled the subscription - id ${subscription.id}`,
    );
    return NextResponse.json({
      message: "Plan cancelled",
      subscription: updatedSubscription,
    });
  } catch (error) {
    console.error("Error canceling subscription:", error);
    return NextResponse.json(
      { error: "An error occurred while canceling the subscription" },
      { status: 500 },
    );
  }
}
