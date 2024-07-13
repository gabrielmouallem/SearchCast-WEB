import { useCookies } from "@/hooks";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import React from "react";
import api from "@/services/ApiService/ApiService";
import { getDecodedJWT } from "@/utils";
import { DecodedCredentials } from "@/types";

export function GoogleLoginButton() {
  const cookies = useCookies("access_token", "");
  const router = useRouter();

  async function onSuccess(response: CredentialResponse) {
    try {
      const googleLoginData = getDecodedJWT<DecodedCredentials>(
        response.credential ?? "",
      );
      api
        .post("/v1/google_login", {
          name: googleLoginData?.name,
          picture: googleLoginData?.picture,
          family_name: googleLoginData?.family_name,
          given_name: googleLoginData?.given_name,
          email: googleLoginData?.email,
          id_token: response.credential,
        })
        .then(({ data }) => {
          cookies.updateCookie(data.access_token, 1);
          toast("Logado com sucesso!", {
            position: "top-right",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            type: "info",
          });
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
  }

  function onError() {
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
    <GoogleLogin
      onSuccess={onSuccess}
      width="360px"
      onError={onError}
      containerProps={{
        style: { height: "50px" },
        className:
          "w-full self-center w-360px bg-white flex items-center justify-center rounded-lg",
      }}
    />
  );
}
