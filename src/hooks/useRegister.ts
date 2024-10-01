"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NextJsApiService } from "@/services/client";

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
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<RegisterFormValues>();

  const handleLogin = async (formData: RegisterFormValues) => {
    setLoading(true);
    try {
      await NextJsApiService.post("/api/register", {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

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
