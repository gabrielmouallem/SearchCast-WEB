"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { NextJsApiService } from "@/services/client";
import { useRouter } from "next/navigation";
import { useCookies, useIdentifyUser } from "@/hooks";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import { LoginResponse } from "@/types";
import { AxiosError } from "axios";
import { AuthError } from "@supabase/supabase-js";

interface LoginFormValues {
  email: string;
  password: string;
}

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const { identifyUser } = useIdentifyUser();
  const router = useRouter();
  const cookies = useCookies("access_token", "");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const hasRun = useRef(false);

  const handleLogin = (formData: LoginFormValues) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      NextJsApiService.post<LoginResponse>("/api/login", formData)
        .then(({ data }) => {
          cookies.updateCookie(data.session.access_token, 1);
          try {
            identifyUser(data.user);
          } catch (err) {
            console.error("Error trying to send user identity to Posthog", {
              err,
            });
          }
          resolve(data);
          return data;
        })
        .catch((err) => {
          reject(err);
          return err;
        })
        .finally(() => {
          setLoading(false);
        });
    });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      await handleLogin(data).then(() => {
        router.push("/search");
      });
    } catch (error) {
      const message =
        (error as AxiosError<AuthError>)?.response?.data?.code ===
        "email_not_confirmed"
          ? "Confirme seu email para continuar."
          : "Erro ao entrar. Por favor tente novamente.";
      const type =
        (error as AxiosError<AuthError>)?.response?.data?.code ===
        "email_not_confirmed"
          ? "info"
          : "error";
      toast(message, {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        type,
      });
      // Handle login error
      console.error(error);
    }
  };

  return {
    loading,
    handleSubmit: handleSubmit(onSubmit),
    control,
    errors,
  };
}
