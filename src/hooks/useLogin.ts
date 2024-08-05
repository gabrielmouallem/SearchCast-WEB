"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "@/services/client";
import { useRouter } from "next/navigation";
import { useCookies, useIdentifyUser } from "@/hooks";
import { toast } from "react-toastify";
import { useState } from "react";
import { LoginResponse, User } from "@/types";

interface LoginFormValues {
  email: string;
  password: string;
}

// Transformation function to ensure only User fields are passed
function transformLoginResponseToUser(data: LoginResponse): User {
  return {
    _id: data._id,
    name: data.name,
    email: data.email,
    created_on: data.created_on,
    subscription: data.subscription,
    allow_unpaid_access: false,
  };
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

  const handleLogin = (formData: LoginFormValues) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      api
        .post<LoginResponse>("/v1/login", formData)
        .then(({ data }) => {
          cookies.updateCookie(data.access_token, 1);
          try {
            const user = transformLoginResponseToUser(data);
            identifyUser(user);
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
      toast("Erro ao entrar. Por favor tente novamente.", {
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
