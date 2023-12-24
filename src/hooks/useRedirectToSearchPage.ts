import { useEffect } from "react";
import { useCookies } from ".";
import { RedirectType, redirect } from "next/navigation";

export function useRedirectToSearchPage() {
  const cookies = useCookies("access_token", "");

  useEffect(() => {
    const access_token = cookies.getCookie();
    const accessTokenIsNotEmpty = access_token !== "";
    const accessTokenIsNotUndefined = !!access_token;

    const shouldRedirectToLoginPage =
      accessTokenIsNotEmpty && accessTokenIsNotUndefined;

    if (shouldRedirectToLoginPage) redirect("/search", RedirectType.replace);
  }, [cookies.getCookie]);
}
