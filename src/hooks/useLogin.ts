"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import api from "@/services/ApiService/ApiService";
import { useRouter } from "next/navigation";
import { useCookies } from "@/hooks";
import { toast } from "react-toastify";

interface LoginResponse {
  _id: string;
  name: string;
  email: string;
  active_subscription: boolean;
  created_on: string;
  access_token: string;
}

interface LoginFormValues {
  email: string;
  password: string;
}

export function useLogin() {
  const router = useRouter();
  const cookies = useCookies("access_token", "");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const loginMutation = useMutation(
    (formData: LoginFormValues) =>
      new Promise((resolve, reject) => {
        api
          .post<LoginResponse>("/v1/login", formData)
          .then(({ data }) => {
            cookies.updateCookie(data.access_token, 1);
            resolve(data);
            return data;
          })
          .catch((err) => {
            console.log({ err });
            reject(err);
            return err;
          });
      })
  );

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      await loginMutation.mutateAsync(data).then(() => {
        router.push("/search");
      });
      toast.info("Logado com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // Handle successful login
    } catch (error) {
      toast.error("Erro ao entrar. Por favor tente novamente.", {
        position: "top-right",
        autoClose: 5000,
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
    loading: loginMutation.isLoading,
    handleSubmit: handleSubmit(onSubmit),
    control,
    errors,
  };
}
