"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { PythonApiService } from "@/services/client";
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
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const cookies = useCookies("access_token", "");
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<RegisterFormValues>();

  const handleLogin = (formData: RegisterFormValues) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      PythonApiService.post<RegisterResponse>("/v1/register", formData)
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
      // Validate confirm email and confirm password
      if (data.email !== data.confirmEmail) {
        toast("Os emails não coincidem.", {
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
        return;
      }

      if (data.password !== data.confirmPassword) {
        toast("As senhas não coincidem.", {
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
        return;
      }

      await handleLogin(data).then(() => {
        router.push("/onboarding");
      });
      toast("Cadastrado com sucesso!", {
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
    } catch (error) {
      toast("Erro ao cadastrar. Por favor tente novamente.", {
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
