import { NextResponse, type NextRequest } from "next/server";
import { Paths } from "@/constants/paths";

export function handleLoginCodeMiddleware(
  request: NextRequest,
  pathname: string,
) {
  const code = new URL(request.url).searchParams.get("code");

  if (pathname.startsWith(Paths.LOGIN) && code) {
    // Redirect to AUTH_CALLBACK to handle code exchange
    return NextResponse.redirect(
      new URL(`${Paths.AUTH_CALLBACK}?code=${code}`, request.url),
    );
  }

  return null;
}
