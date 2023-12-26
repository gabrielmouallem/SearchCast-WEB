import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { RedirectType, redirect } from "next/navigation";

export function useRedirectToPaymentPage() {
  const { user, clearAccessToken } = useAuth();

  useEffect(() => {
    if (!user || !user?.active_subscription) {
      setTimeout(() => clearAccessToken(), 500);
      redirect("/payment-required", RedirectType.replace);
    }
  }, [user, clearAccessToken]);
}
