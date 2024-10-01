"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/services/client";
import { LoadingFallback } from "@/components/LoadingFallback";
import { CookiesService } from "@/services/client/CookiesService/CookiesService";
import { Suspense } from "react";

const supabase = createClient();

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check for code and redirect if not found
        const code = searchParams.get("code");
        if (!code) {
          console.error("No code found in URL parameters");
          router.push("/error");
          return;
        }

        // Exchange code for session
        await supabase.auth.exchangeCodeForSession(code);
        // Get the session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) throw new Error("No session");

        // Add access token to cookies
        CookiesService.setItem("access_token", session.access_token, 1); // Set cookie to expire in 1 day

        router.push("/search");
      } catch (error) {
        console.error("Auth error:", error);
        router.push("/error");
      }
    };

    handleAuthCallback();
  }, [router, searchParams]);

  return (
    <div className="-mt-[20vh] flex min-h-screen">
      <LoadingFallback />
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthCallbackContent />
    </Suspense>
  );
}
