import { NextResponse, type NextRequest } from "next/server";
import { Paths } from "@/constants/paths";

export function handleErrorMiddleware(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(new URL(Paths.ERROR, request.url));
  }

  return null;
}
