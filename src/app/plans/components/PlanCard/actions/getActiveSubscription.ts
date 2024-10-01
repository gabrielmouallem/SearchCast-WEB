"use server";
import { getUser } from "@/utils/server";
import { checkActiveSubscription } from "@/utils/server/checkActiveSubscription";

export async function getActiveSubscription(email: string) {
  try {
    const user = await getUser();
    if (!user)
      throw Error(`Error while getting active subscription: user not found`);
    const subscriptionResult = await checkActiveSubscription(email);

    if (subscriptionResult === false) return null;

    console.log(JSON.stringify(subscriptionResult, null, 2));

    const intervalCount =
      subscriptionResult.items?.data?.[0]?.plan?.interval_count;

    const plan = getPlanType(intervalCount);
    return { ...subscriptionResult, plan };
  } catch (err) {
    throw Error(`${err}`);
  }
}

function getPlanType(intervalCount: number): string {
  switch (intervalCount) {
    case 1:
      return "month" as const;
    case 6:
      return "semester" as const;
    case 12:
      return "year" as const;
    default:
      return "unknown" as const;
  }
}
