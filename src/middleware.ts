import { type NextRequest } from "next/server";
import { handleErrorMiddleware } from "@/middlewares/errorMiddleware";
import { handlePasswordResetMiddleware } from "@/middlewares/passwordResetMiddleware";
import { handleLoginCodeMiddleware } from "@/middlewares/loginCodeMiddleware";
import { handleApiMiddleware } from "@/middlewares/apiMiddleware";
import { handleClientAuthMiddleware } from "@/middlewares/clientAuthMiddleware";

export async function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);

  // Run error middleware
  const errorResponse = handleErrorMiddleware(request);
  if (errorResponse) return errorResponse;

  // Run password reset middleware
  const passwordResetResponse = handlePasswordResetMiddleware(
    request,
    pathname,
  );
  if (passwordResetResponse) return passwordResetResponse;

  // Run login code middleware
  const loginCodeResponse = handleLoginCodeMiddleware(request, pathname);
  if (loginCodeResponse) return loginCodeResponse;

  // Handle API routes
  if (pathname.startsWith("/api/")) {
    return handleApiMiddleware(request, pathname);
  }

  // Handle client-side routes
  return handleClientAuthMiddleware(request, pathname);
}

export const config = {
  matcher: [
    // Include all routes except static assets, images, and specific file types
    "/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|sitemap|robots|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)",
    // Include all API routes
    "/api/:path*",
  ],
};
