"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { NextJsApiService, PythonApiService } from "@/services/client";
import { toast } from "react-toastify";
import { useState } from "react";
import { LoginResponse } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";

interface PasswordResetFormValues {
  password: string;
  confirmPassword: string;
}

export function usePasswordReset() {
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<PasswordResetFormValues>();

  const handlePasswordReset = (formData: PasswordResetFormValues) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      const code = searchParams.get("code");
      NextJsApiService.post<LoginResponse>("/api/password-reset", {
        password: formData?.password,
        code,
      })
        .then(({ data }) => {
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

  const onSubmit: SubmitHandler<PasswordResetFormValues> = async (data) => {
    try {
      await handlePasswordReset(data).then(() => {
        setTimeout(() => {
          router.push("/login");
        }, 4000);
      });
      toast("Senha alterada com sucesso!", {
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
      // Handle successful login
    } catch (error) {
      toast("Erro. A redefinição de senha talvez tenha expirado.", {
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
    watch,
    handleSubmit: handleSubmit(onSubmit),
    control,
    errors,
  };
}
