import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "./services/server";
import { Paths, PUBLIC_PATHS } from "./constants/paths";
import { User } from "./types";
import { checkActiveSubscription } from "./utils/server/checkActiveSubscription";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = new URL(request.url);
  const error = searchParams.get("error");

  // Check for error parameter and redirect to error page if present
  if (error) {
    return NextResponse.redirect(new URL(Paths.ERROR, request.url));
  }

  const code = searchParams.get("code");

  // Handle password reset path
  if (pathname === Paths.PASSWORD_RESET) {
    if (code) {
      // If code is present, allow the request to proceed
      return NextResponse.next();
    }
    // If no code is present, continue with the existing logic
  }

  const accessToken = request.cookies.get("access_token")?.value;

  const supabase = createClient();

  // Handle code exchange for authentication paths
  if (pathname.startsWith(Paths.LOGIN) && code) {
    // Redirect to AUTH_CALLBACK to handle code exchange
    return NextResponse.redirect(
      new URL(`${Paths.AUTH_CALLBACK}?code=${code}`, request.url),
    );
  }

  // Check user authentication status
  let user = null;
  if (accessToken) {
    // Verify the access token and get user data
    const { data, error } = await supabase.auth.getUser(accessToken);
    if (!error) {
      user = data.user;
    }
  }

  // Handle authenticated users
  if (user) {
    // Only check subscription for the search page
    if (pathname.startsWith(Paths.SEARCH)) {
      if ((user as User).user_metadata?.allow_unpaid_access)
        return NextResponse.next();
      // Check for active Stripe subscription
      const hasActiveSubscription = await checkActiveSubscription(user.email!);

      if (!hasActiveSubscription) {
        return NextResponse.redirect(new URL(Paths.PLANS, request.url));
      }
    }

    // If not the search page or has active subscription, allow access
    return NextResponse.next();
  } else {
    // Handle unauthenticated users
    if (!PUBLIC_PATHS.includes(pathname as Paths)) {
      return NextResponse.redirect(new URL(Paths.LOGIN, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API endpoints)
     * - manifest.webmanifest (web app manifest file)
     * - sitemap (sitemap file, with or without .xml extension)
     * - robots (robots file, with or without .txt extension)
     * Also exclude static image and video files
     */
    "/((?!_next/static|_next/image|favicon.ico|api/|manifest.webmanifest|sitemap|robots|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)",
  ],
};
