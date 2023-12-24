import { useEffect } from "react";
import { useCookies } from ".";
import { RedirectType, redirect } from "next/navigation";

export function useRedirectToLoginPage() {
  const cookies = useCookies("access_token", "");

  useEffect(() => {
    const access_token = cookies.getCookie();
    const accessTokenIsEmpty = access_token === "";
    const accessTokenIsUndefined = !access_token;

    const shouldRedirectToLoginPage =
      accessTokenIsEmpty || accessTokenIsUndefined;

    if (shouldRedirectToLoginPage) redirect("/login", RedirectType.replace);
  }, [cookies.getCookie]);
}
