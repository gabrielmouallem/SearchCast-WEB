"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "@/services/ApiService/ApiService";
import { toast } from "react-toastify";
import { useState } from "react";
import { LoginResponse } from "@/types";
import { useRouter } from "next/navigation";

interface PasswordResetFormValues {
  password: string;
}

export function useForgotPassword() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PasswordResetFormValues>();

  const handleLogin = (formData: PasswordResetFormValues) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      api
        .post<LoginResponse>("/v1/password-reset", formData)
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
      await handleLogin(data).then(() => {
        router.push("/login");
      });
      toast.info("Senha alterada com sucesso!", {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // Handle successful login
    } catch (error) {
      toast.error("Erro. Por favor tente novamente.", {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
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
