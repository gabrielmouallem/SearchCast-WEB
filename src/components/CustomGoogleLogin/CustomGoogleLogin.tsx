"use client";
import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Image from "next/image";
import { useCookies } from "@/hooks";
import { useRouter } from "next/navigation";
import { api } from "@/services/client";
import { toast } from "react-toastify";
import { getGoogleEnvVars } from "@/utils/shared";
import "react-toastify/dist/ReactToastify.css";

const Spinner = () => (
  <svg
    className="animate-spin"
    fill="#85888E"
    width="30px"
    height="30px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="M8,1V2.8A5.2,5.2,0,1,1,2.8,8H1A7,7,0,1,0,8,1Z" />
    </g>
  </svg>
);

interface UserInfo {
  name: string;
  picture: string;
  family_name: string;
  given_name: string;
  email: string;
  sub: string; // The unique user ID
}

const fetchUserInfo = async (accessToken: string): Promise<UserInfo> => {
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return await response.json();
};

export function CustomGoogleLogin() {
  const [loading, setLoading] = useState(false);
  const cookies = useCookies("access_token", "");
  const router = useRouter();

  const showErrorToast = () =>
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

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      setLoading(true);
      try {
        // Exchange authorization code for tokens
        const params = new URLSearchParams({
          code: response.code,
          grant_type: "authorization_code",
          ...getGoogleEnvVars(),
        });

        const tokenResponse = await axios.post(
          "https://oauth2.googleapis.com/token",
          params.toString(),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          },
        );

        const { id_token, access_token } = tokenResponse.data;

        // Fetch user info using the access token
        const userInfo = await fetchUserInfo(access_token);

        api
          .post("/v1/google_login", {
            name: userInfo?.name,
            picture: userInfo?.picture,
            family_name: userInfo?.family_name,
            given_name: userInfo?.given_name,
            email: userInfo?.email,
            id_token,
          })
          .then(({ data }) => {
            cookies.updateCookie(data.access_token, 1);
            router.push("/search");
            return data;
          })
          .catch(() => {
            showErrorToast();
            setLoading(false);
          });
      } catch (err) {
        showErrorToast();
        setLoading(false);
      }
    },
    onError: () => {
      showErrorToast();
      setLoading(false);
    },
    flow: "auth-code",
  });

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    login();
  };

  return (
    <button
      onClick={handleLogin}
      className="flex h-[50px] w-full items-center justify-center rounded-lg border border-border bg-background px-5 py-3 text-center text-base font-light text-text-primary"
      disabled={loading}
    >
      {loading ? (
        <Spinner />
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
