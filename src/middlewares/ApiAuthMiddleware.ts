import { NextResponse, type NextRequest } from "next/server";
import { PUBLIC_API_PATHS } from "@/constants/paths";

export function handleApiAuthMiddleware(
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

  // If token is present, allow the request to proceed
  return NextResponse.next();
}
