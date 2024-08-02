import { NextResponse } from "next/server";
import {
  getRefreshedAccessToken,
  getDecodedJWT,
  stringToBoolean,
} from "./utils/shared";
import { User } from "./types";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

const PROTECTED_ROUTES_PATHNAMES = [
  "/search",
  "/onboarding",
  "/plans",
  "/profile",
];

const PAGES_THAT_SHOULD_NOT_RENDER_WHILE_AUTHENTICATED = [
  "/forgot-password",
  "/login",
  "/register",
];

function setAccessToken(req: any, value: string) {
  return (req.cookies as RequestCookies).set("access_token", value);
}

function getAccessToken(req: any) {
  return (req.cookies as RequestCookies).get("access_token")?.value;
}

function getSkipOnboarding(req: any) {
  return stringToBoolean(
    (req.cookies as RequestCookies).get("skip_onboarding")?.value ?? "",
  );
}

function redirectToPage(req: any, pathname: `/${string}`) {
  return NextResponse.redirect(new URL(pathname, req.url));
}

export async function middleware(req: any) {
  const access_token = getAccessToken(req);
  const skip_onboarding = getSkipOnboarding(req);
  const user = getDecodedJWT<any>(access_token ?? "")?.sub as User | undefined;

  if (PROTECTED_ROUTES_PATHNAMES.includes(req.nextUrl.pathname)) {
    if (!access_token) return redirectToPage(req, "/login");
    if (!user) return redirectToPage(req, "/login");

    if (req.nextUrl.pathname === "/search") {
      const data = await getRefreshedAccessToken(access_token ?? "");
      const refreshed_access_token = data?.access_token ?? "";
      const refreshedUser = getDecodedJWT<any>(refreshed_access_token ?? "")
        ?.sub as User | undefined;

      if (
        (!refreshedUser || !refreshedUser?.subscription) &&
        !refreshedUser?.allow_unpaid_access
      ) {
        if (skip_onboarding) return redirectToPage(req, "/plans");
        return redirectToPage(req, "/onboarding");
      }
      setAccessToken(req, refreshed_access_token);
      return NextResponse.next();
    }
    return NextResponse.next();
  } else if (
    PAGES_THAT_SHOULD_NOT_RENDER_WHILE_AUTHENTICATED.includes(
      req.nextUrl.pathname,
    )
  ) {
    if (access_token) return redirectToPage(req, "/search");
  }

  return NextResponse.next();
}
