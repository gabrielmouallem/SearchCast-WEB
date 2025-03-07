"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { NextJsApiService } from "@/services/client";
import { toast } from "react-toastify";
import { useState } from "react";
import { LoginResponse } from "@/types";

interface PasswordResetFormValues {
  email: string;
}

export function useForgotPassword() {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PasswordResetFormValues>();

  const handleForgotPassword = (formData: PasswordResetFormValues) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      NextJsApiService.post<LoginResponse>("/api/forgot-password", formData)
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
      handleForgotPassword(data)
        .then(() => {
          toast("Email de mudança de senha enviado com sucesso!", {
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
        })
        .catch((error) => {
          toast("Erro. Por favor tente novamente.", {
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
        });
      // Handle successful login
    } catch (error) {
      toast("Erro. Por favor tente novamente.", {
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
