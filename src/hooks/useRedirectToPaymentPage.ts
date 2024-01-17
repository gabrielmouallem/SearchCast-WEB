import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { RedirectType, redirect } from "next/navigation";

export function useRedirectToPaymentPage() {
  const { user, clearAccessToken } = useAuth();

  useEffect(() => {
    if ((!user || !user?.subscription) && !user?.allow_unpaid_access) {
      redirect("/plans", RedirectType.replace);
    }
  }, [user, clearAccessToken]);
}
