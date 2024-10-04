import { NextResponse, type NextRequest } from "next/server";
import { PUBLIC_API_PATHS } from "@/constants/paths";
import { checkActiveSubscription } from "@/utils/server/checkActiveSubscription";
import { getUser } from "@/utils/server";

export async function handleApiMiddleware(
  request: NextRequest,
  pathname: string,
) {
  // Allow access to public API paths without authentication
  if (PUBLIC_API_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check for the presence of an access token
  const accessToken = request.cookies.get("access_token")?.value;

  if (!accessToken) {
    return new NextResponse(
      JSON.stringify({ error: "Authentication required" }),
      { status: 401, headers: { "content-type": "application/json" } },
    );
  }

  // Get the user
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check for paid subscription only for specific routes
  if (
    pathname.startsWith("/api/autosuggestions") ||
    pathname.startsWith("/api/search") ||
    pathname.startsWith("/api/expand-transcriptions")
  ) {
    const hasActiveSubscription = await checkActiveSubscription(user.email!);

    if (!hasActiveSubscription && !user?.user_metadata?.allow_unpaid_access) {
      return NextResponse.json({ error: "Payment required" }, { status: 403 });
    }
  }

  // If all checks pass, allow the request to proceed
  return NextResponse.next();
}
