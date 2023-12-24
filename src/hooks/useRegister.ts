"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "@/services/ApiService/ApiService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useCookies } from "@/hooks";
import { useState } from "react";

interface RegisterResponse {
  _id: string;
  name: string;
  email: string;
  active_subscription: boolean;
  created_on: string;
  access_token: string;
}

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const cookies = useCookies("access_token", "");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const handleLogin = (formData: RegisterFormValues) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      api
        .post<RegisterResponse>("/v1/register", formData)
        .then(({ data }) => {
          cookies.updateCookie(data.access_token, 1);
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

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      await handleLogin(data).then(() => {
        router.push("/search");
      });
      toast.info("Cadastrado com sucesso!", {
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
      toast.error("Erro ao cadastrar. Por favor tente novamente.", {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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
