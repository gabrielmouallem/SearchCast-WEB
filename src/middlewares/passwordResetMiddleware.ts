import { NextResponse, type NextRequest } from "next/server";
import { Paths } from "@/constants/paths";

export function handlePasswordResetMiddleware(
  request: NextRequest,
  pathname: string,
) {
  if (pathname === Paths.PASSWORD_RESET) {
    const code = new URL(request.url).searchParams.get("code");
    if (code) {
      // If code is present, allow the request to proceed
      return NextResponse.next();
    }
  }
  return null;
}
