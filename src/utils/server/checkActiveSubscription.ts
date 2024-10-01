import Stripe from "stripe";

// Initialize Stripe client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16", // Use the latest API version
});

export async function checkActiveSubscription(
  email: string,
): Promise<Stripe.Subscription | false> {
  console.log({ email });
  try {
    const customers = await stripe.customers.list({ email: email });
    if (customers.data.length === 0) {
      return false;
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: customers.data[0].id,
      status: "all",
    });

    // Check for active or trialing subscriptions, including those canceled but not yet expired
    const activeSubscription = subscriptions.data.find(
      (sub) =>
        ["active", "trialing"].includes(sub.status) ||
        (sub.status === "canceled" &&
          sub.current_period_end > Math.floor(Date.now() / 1000)),
    );

    if (activeSubscription) {
      return activeSubscription;
    }

    return false;
  } catch (error) {
    console.error("Error checking subscription:", error);
    return false;
  }
}
