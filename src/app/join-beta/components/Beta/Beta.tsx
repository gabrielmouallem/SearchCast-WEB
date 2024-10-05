"use client";
import { Button } from "@/components/Button";
import { LoadingFallback } from "@/components/LoadingFallback";
import { useUser } from "@/hooks";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useRequestBetaAccess } from "@/hooks/useRequestBetaAccess";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRefreshUser } from "@/hooks/useRefreshUser";

export function Beta() {
  const { refetch: refetchUser } = useRefreshUser();
  const user = useUser();
  const isMounted = useIsMounted();
  const [isParticipating, setIsParticipating] = useState(
    Boolean(user?.user_metadata?.beta_access_requested),
  );
  const { mutate: requestAccess, isPending } = useRequestBetaAccess();

  const handleClick = () => {
    if (!isParticipating && !isPending) {
      requestAccess(undefined, {
        onSuccess: async () => {
          refetchUser(); // Refetch the user data to update the client-side state
          setIsParticipating(true);
        },
      });
    }
  };

  if (!isMounted)
    return <LoadingFallback height="[height:calc(100vh-100px)]" />;

  return (
    <>
      <ToastContainer />
      <div className="flex w-screen flex-col items-center justify-center gap-8 px-5 pt-[5vh] text-center">
        <div className="flex flex-col items-center justify-center gap-8 rounded-3xl border border-gray-800 bg-background px-5 py-14">
          <h1 className="max-w-md text-4xl font-bold text-text-primary">
            Participe do Beta do SearchCast
          </h1>
          <p className="max-w-md text-center text-lg text-text-secondary">
            Seja um dos primeiros a experimentar nossa revolucionária plataforma
            de busca de podcasts. Ajude-nos a moldar o futuro da descoberta de
            conteúdo de áudio!
          </p>
          <Button
            onClick={handleClick}
            title={
              isParticipating ? "Você já solicitou participação no beta" : ""
            }
            startIcon={
              isPending ? (
                <svg className="mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <svg
                  className="mr-2 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              )
            }
            disabled={isParticipating || isPending}
            className="w-full max-w-[220px]"
          >
            {isParticipating
              ? "Solicitado!"
              : isPending
                ? "Solicitando..."
                : "Participar do Beta!"}
          </Button>
          <div className="mt-4 max-w-md text-center text-sm text-text-secondary">
            Ao participar do beta, você terá acesso antecipado a recursos
            exclusivos e a oportunidade de fornecer feedback valioso para moldar
            o futuro do SearchCast.
          </div>
        </div>
      </div>
    </>
  );
}
