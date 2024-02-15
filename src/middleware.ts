import { NextResponse } from "next/server";
import { getRefreshedAccessToken, getDecodedJWT } from "./utils";
import { User } from "./types";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

const PROTECTED_ROUTES_PATHNAMES = ["/search", "/plans", "/profile"];

const PAGES_THAT_SHOULD_NOT_RENDER_WHILE_AUTHENTICATED = [
  "/forgot-password",
  "/login",
];

function setAccessToken(req: any, value: string) {
  return (req.cookies as RequestCookies).set("access_token", value);
}

function getAccessToken(req: any) {
  return (req.cookies as RequestCookies).get("access_token")?.value;
}

function redirectToPage(req: any, pathname: `/${string}`) {
  return NextResponse.redirect(new URL(pathname, req.url));
}

export async function middleware(req: any) {
  const access_token = getAccessToken(req);
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
      )
        return redirectToPage(req, "/plans");
      return setAccessToken(req, refreshed_access_token);
    }
  } else if (
    PAGES_THAT_SHOULD_NOT_RENDER_WHILE_AUTHENTICATED.includes(
      req.nextUrl.pathname
    )
  ) {
    if (access_token) return redirectToPage(req, "/search");
  }

  return NextResponse.next();
}
