"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import api from "@/services/ApiService/ApiService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useCookies } from "@/hooks";

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
  const router = useRouter();
  const cookies = useCookies("access_token", "");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const loginMutation = useMutation(
    (formData: RegisterFormValues) =>
      new Promise((resolve, reject) => {
        api
          .post<RegisterResponse>("/v1/register", formData)
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

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      await loginMutation.mutateAsync(data).then(() => {
        router.push("/search");
      });
      toast.info("Cadastrado com sucesso!", {
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
      toast.error("Erro ao cadastrar. Por favor tente novamente.", {
        position: "top-right",
        autoClose: 5000,
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
    loading: loginMutation.isLoading,
    handleSubmit: handleSubmit(onSubmit),
    control,
    errors,
  };
}
