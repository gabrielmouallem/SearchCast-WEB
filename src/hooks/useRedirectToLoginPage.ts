import { useEffect } from "react";
import { useCookies } from ".";
import { RedirectType, redirect } from "next/navigation";

export function useRedirectToLoginPage(
  reason:
    | "ATTEMPT_TO_ACCESS_AUTHENTICATED_PAGE_LOGGED_OUT"
    | "ATTEMPT_TO_ACCESS_FORGOT_PASSWORD_LOGGED_IN" = "ATTEMPT_TO_ACCESS_AUTHENTICATED_PAGE_LOGGED_OUT"
) {
  const cookies = useCookies("access_token", "");

  useEffect(() => {
    const access_token = cookies.getCookie();
    const accessTokenIsEmpty = access_token === "";
    const accessTokenIsUndefined = !access_token;

    if (reason === "ATTEMPT_TO_ACCESS_AUTHENTICATED_PAGE_LOGGED_OUT") {
      const shouldRedirectToLoginPage =
        accessTokenIsEmpty || accessTokenIsUndefined;

      if (shouldRedirectToLoginPage) redirect("/login", RedirectType.replace);
    } else if (reason === "ATTEMPT_TO_ACCESS_FORGOT_PASSWORD_LOGGED_IN") {
      const shouldRedirectToSearchPage =
        !accessTokenIsEmpty || !accessTokenIsUndefined;

      if (shouldRedirectToSearchPage) redirect("/search", RedirectType.replace);
    }
  }, [cookies.getCookie, reason]);
}
