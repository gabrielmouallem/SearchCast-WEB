import { NextResponse, type NextRequest } from "next/server";
import { Paths, PROTECTED_PATHS, PUBLIC_PATHS } from "@/constants/paths";

export function handleClientAuthMiddleware(
  request: NextRequest,
  pathname: string,
) {
  const accessToken = request.cookies.get("access_token")?.value;

  // Allow access to the root path for all users
  if (pathname === "/") {
    return NextResponse.next();
  }

  if (!accessToken) {
    if (PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
      // Redirect unauthenticated users to login page
      return NextResponse.redirect(new URL(Paths.LOGIN, request.url));
    }
  } else {
    if (PUBLIC_PATHS.some((path) => pathname === path)) {
      // Redirect authenticated users to search page if they try to access login or register
      return NextResponse.redirect(new URL(Paths.SEARCH, request.url));
    }
  }

  // Allow the request to proceed for all other cases
  return NextResponse.next();
}
