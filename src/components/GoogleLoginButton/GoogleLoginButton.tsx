import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "@/components";
import { createClient } from "@/services/client";

const supabase = createClient();

export function GoogleLoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleGoogleLogin() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            prompt: "select_account",
          },
        },
      });

      if (error) throw error;

      if (data?.url) {
        // Redirect the user to Google's OAuth page
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      toast("Erro com o Login Google. Por favor tente novamente.", {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        type: "error",
      });
      setIsLoading(false);
    }
  }

  return (
    <button
      className="flex h-[50px] w-full items-center justify-center rounded-lg border border-border bg-background px-5 py-3 text-center text-base font-light text-text-primary"
      onClick={handleGoogleLogin}
      disabled={isLoading}
    >
      {isLoading ? (
        <Spinner fill="#85888E" />
      ) : (
        <>
          <Image
            src="/google_logo_icon.svg"
            alt="Google Icon"
            width={24}
            height={24}
            className="mr-2.5"
          />
          <span>Entrar com o Google</span>
        </>
      )}
    </button>
  );
}
