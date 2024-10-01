import { NextResponse, type NextRequest } from "next/server";
import { Paths, PROTECTED_PATHS, PUBLIC_PATHS } from "@/constants/paths";
import { getActiveSubscription } from "@/app/plans/components/PlanCard/actions/getActiveSubscription";
import { createClient } from "@/services/server";

export async function handleClientAuthMiddleware(
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

    // Initialize Supabase client
    const supabase = createClient();

    // Get user data
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error) {
      console.error("Error fetching user:", error);
      return NextResponse.next();
    }

    if (user) {
      const createdAt = new Date(user.created_at);
      const now = new Date();
      const isFirstAccess = now.getTime() - createdAt.getTime() < 5 * 60 * 1000; // 5 minutes

      // Condition for redirecting from search to plans (for non-first-time users)
      if (pathname === Paths.SEARCH) {
        if (isFirstAccess) {
          // Redirect first-time users to the onboarding page
          return NextResponse.redirect(new URL("/onboarding", request.url));
        }

        const activeSubscription = await getActiveSubscription(user.email!);
        if (!activeSubscription && !user.user_metadata?.allow_unpaid_access) {
          return NextResponse.redirect(new URL("/plans", request.url));
        }
      }
    }
  }

  // Allow the request to proceed for all other cases
  return NextResponse.next();
}
