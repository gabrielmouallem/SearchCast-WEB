import { useCookies } from "@/hooks";
import {
  GoogleLogin as GoogleLoginTrigger,
  CredentialResponse,
} from "@react-oauth/google";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { PythonApiService } from "@/services/client";
import { getDecodedJWT } from "@/utils/shared";
import { DecodedCredentials } from "@/types";
import Image from "next/image";
import { Spinner } from "@/components";

export function GoogleLoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const cookies = useCookies("access_token", "");
  const router = useRouter();

  function onLoading(value: boolean) {
    setIsLoading(value);
  }

  async function onSuccess(response: CredentialResponse) {
    onLoading(true);
    try {
      const googleLoginData = getDecodedJWT<DecodedCredentials>(
        response.credential ?? "",
      );
      await PythonApiService.post("/v1/google_login", {
        name: googleLoginData?.name,
        picture: googleLoginData?.picture,
        family_name: googleLoginData?.family_name,
        given_name: googleLoginData?.given_name,
        email: googleLoginData?.email,
        id_token: response.credential,
      }).then(({ data }) => {
        cookies.updateCookie(data.access_token, 1);
        router.push("/search");
        return data;
      });
    } catch (err) {
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
    }
    onLoading(false);
  }

  function onError() {
    onLoading(false);
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
  }

  return (
    <div className="relative w-full">
      <div className="absolute inset-0 z-50 opacity-0">
        <GoogleLoginTrigger
          onSuccess={onSuccess}
          width="360px"
          onError={onError}
          containerProps={{
            style: { height: "50px" },
            className: "w-full w-360px flex items-center justify-center",
          }}
        />
      </div>
      <button
        className="flex h-[50px] w-full items-center justify-center rounded-lg border border-border bg-background px-5 py-3 text-center text-base font-light text-text-primary"
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
    </div>
  );
}
