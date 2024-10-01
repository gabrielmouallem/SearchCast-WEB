import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "./services/server";
import { Paths, PUBLIC_PATHS, CODE_HANDLING_PATHS } from "./constants/paths";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const accessToken = request.cookies.get("access_token")?.value;

  const supabase = createClient();

  (request as any).supabase = supabase;

  // Handle password reset path separately
  if (pathname === Paths.PASSWORD_RESET) {
    return NextResponse.next();
  }

  // Handle code exchange for authentication paths
  if (CODE_HANDLING_PATHS.includes(pathname as Paths) && code) {
    // Exchange the code for a session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(new URL(Paths.ERROR, request.url));
    }

    const response = NextResponse.redirect(new URL(Paths.SEARCH, request.url));
    response.cookies.set("access_token", data.session.access_token, {
      httpOnly: true,
    });
    return response;
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
    if (pathname === Paths.SEARCH) {
      return NextResponse.next();
    }

    if (PUBLIC_PATHS.includes(pathname as Paths)) {
      return NextResponse.redirect(new URL(Paths.SEARCH, request.url));
    }

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
     * Also exclude static image files
     */
    "/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
