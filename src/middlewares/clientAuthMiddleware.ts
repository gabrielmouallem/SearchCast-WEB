import { NextResponse, type NextRequest } from "next/server";
import { Paths, PROTECTED_PATHS, PUBLIC_PATHS } from "@/constants/paths";
import { getActiveSubscription } from "@/app/plans/components/PlanCard/actions/getActiveSubscription";
import { createClient } from "@/services/server";
import { User } from "@/types";
import { posthog } from "@/services/server";

export async function handleClientAuthMiddleware(
  request: NextRequest,
  pathname: string,
) {
  //
  const accessToken = request.cookies.get("access_token")?.value;

  // Allow access to the root path for all users
  if (pathname === "/") {
    console.log(
      `[ClientAuthMiddleware] Allowing access to root path: ${pathname}`,
    );
    return NextResponse.next();
  }

  if (!accessToken) {
    if (PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
      // Redirect unauthenticated users to login page
      console.log(
        `[ClientAuthMiddleware] Redirecting unauthenticated user to login: ${Paths.LOGIN}`,
      );
      return NextResponse.redirect(new URL(Paths.LOGIN, request.url));
    }
  } else {
    if (PUBLIC_PATHS.some((path) => pathname === path)) {
      // Redirect authenticated users to search page if they try to access login or register
      console.log(
        `[ClientAuthMiddleware] Redirecting authenticated user to search: ${Paths.SEARCH}`,
      );
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
      const errorParams = new URLSearchParams({
        error: error?.name ?? "AuthError",
        error_code: String(error?.status ?? "500"),
        error_description: encodeURIComponent(
          error?.message ?? "An error occurred while fetching user data",
        ),
      });
      console.log(
        `[ClientAuthMiddleware] Redirecting to error page: ${Paths.ERROR}`,
      );
      return NextResponse.redirect(
        new URL(`${Paths.ERROR}#${errorParams}`, request.url),
      );
    }

    if (user) {
      // Check if beta-program feature is enabled
      const isBetaProgramEnabled = Boolean(
        await posthog.isFeatureEnabled("beta-program", user.id),
      );

      const hasBetaAccess = Boolean(
        (user as User).user_metadata?.allow_beta_access,
      );
      const hasUnpaidAccess = Boolean(
        (user as User).user_metadata?.allow_unpaid_access,
      );

      // Check for active subscription
      const activeSubscription = await getActiveSubscription(user.email!);

      const hasActiveSubscription = !!activeSubscription;
      const hasAnyAccess = hasBetaAccess || hasUnpaidAccess;
      const needsSubscription = !hasActiveSubscription && !hasAnyAccess;

      if (pathname.startsWith(Paths.SEARCH)) {
        if (needsSubscription) {
          const redirectPath = isBetaProgramEnabled
            ? Paths.JOIN_BETA
            : Paths.PLANS;
          console.log(
            `[ClientAuthMiddleware] Redirecting to ${isBetaProgramEnabled ? "join beta" : "plans"} page: ${redirectPath}`,
          );
          return NextResponse.redirect(new URL(redirectPath, request.url));
        }
      } else if (pathname.startsWith(Paths.JOIN_BETA)) {
        const shouldRedirectFromJoinBeta =
          hasActiveSubscription || hasAnyAccess || !isBetaProgramEnabled;
        if (shouldRedirectFromJoinBeta) {
          const redirectPath =
            hasActiveSubscription || hasAnyAccess ? Paths.SEARCH : Paths.PLANS;
          console.log(
            `[ClientAuthMiddleware] Redirecting from join-beta to ${redirectPath === Paths.SEARCH ? "search" : "plans"} page: ${redirectPath}`,
          );
          return NextResponse.redirect(new URL(redirectPath, request.url));
        }
      }

      console.log(
        `[ClientAuthMiddleware] User access state: isBetaProgramEnabled=${isBetaProgramEnabled}, hasActiveSubscription=${hasActiveSubscription}, hasBetaAccess=${hasBetaAccess}, hasUnpaidAccess=${hasUnpaidAccess}`,
      );
    }
  }

  // Allow the request to proceed for all other cases
  console.log(
    `[ClientAuthMiddleware] Allowing request to proceed: ${pathname}`,
  );
  return NextResponse.next();
}
