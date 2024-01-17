import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { RedirectType, redirect } from "next/navigation";
import { useRefreshAccessToken } from ".";

export function useRedirectToPaymentPage() {
  const { isLoading } = useRefreshAccessToken();
  const { getUser, clearAccessToken } = useAuth();

  useEffect(() => {
    const user = getUser();
    if (
      (!user || !user?.subscription) &&
      !user?.allow_unpaid_access &&
      !isLoading
    ) {
      redirect("/plans", RedirectType.replace);
    }
  }, [clearAccessToken, isLoading, getUser]);
}
