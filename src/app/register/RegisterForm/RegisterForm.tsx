"use client";
import React, { useEffect } from "react";
import { Input, Button } from "@/components"; // Adjust the path as needed
import { Controller } from "react-hook-form";
import { Navbar, Footer } from "@/components"; // Assuming these components exist
import { useCookies, useRegister } from "@/hooks";
import { RedirectType, redirect } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export function RegisterForm() {
  const { loading, handleSubmit, control, errors } = useRegister();
  const cookies = useCookies("access_token", "");

  useEffect(() => {
    const access_token = cookies.getCookie();
    const accessTokenIsNotEmpty = access_token !== "";
    const accessTokenIsNotUndefined = !!access_token;

    const shouldRedirectToLoginPage =
      accessTokenIsNotEmpty && accessTokenIsNotUndefined;

    if (shouldRedirectToLoginPage) redirect("/search", RedirectType.replace);
  }, [cookies.getCookie]);

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <div className="flex items-center justify-center">
            <div className="flex flex-col font-semibold items-center justify-center gap-8 w-full">
              <div className="text-center text-3xl">Cadastre-se</div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="text-3xl font-semibold leading-9 flex flex-col items-center justify-center gap-5">
                    <div>
                      <div className="text-sm text-gray-300 font-medium leading-5">
                        Nome
                      </div>
                      <Controller
                        name="name"
                        control={control}
                        rules={{
                          required: "Nome é obrigatório.",
                          minLength: {
                            value: 3,
                            message:
                              "O nome precisa ter pelo menos 3 caracteres.",
                          },
                        }}
                        render={({ field }) => (
                          <Input
                            className="w-360px"
                            type="text"
                            placeholder="Nome"
                            {...field}
                          />
                        )}
                      />
                      {errors.email && (
                        <div className="text-xs text-red-600 font-light">
                          {errors.email.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm text-gray-300 font-medium leading-5">
                        Email
                      </div>
                      <Controller
                        name="email"
                        control={control}
                        rules={{
                          required: "Email é obrigatório",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Endereço de email inválido.",
                          },
                        }}
                        render={({ field }) => (
                          <Input
                            className="w-360px"
                            type="email"
                            placeholder="Email"
                            {...field}
                          />
                        )}
                      />
                      {errors.email && (
                        <div className="text-xs text-red-600 font-light">
                          {errors.email.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm text-gray-300 font-medium leading-5">
                        Senha
                      </div>
                      <Controller
                        name="password"
                        control={control}
                        rules={{
                          required: "Senha é obrigatório",
                          minLength: {
                            value: 8,
                            message:
                              "A senha deve conter pelo menos 8 caracteres.",
                          },
                          pattern: {
                            value:
                              /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&.*]+$/,
                            message:
                              "A senha deve incluir números e caracteres especiais.",
                          },
                        }}
                        render={({ field }) => (
                          <Input
                            className="w-360px"
                            type="password"
                            placeholder="Senha"
                            {...field}
                          />
                        )}
                      />
                      {errors.password && (
                        <div className="text-xs text-red-600 font-light">
                          {errors.password.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-360px flex items-center justify-between text-sm font-normal leading-5">
                    <div>
                      <label className="inline-flex items-center">
                        <input type="checkbox" />
                        <span className="ml-2">Lembrar-me por 30 dias</span>
                      </label>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className={`!bg-brand w-360px ${
                      loading ? "opacity-50" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? "Cadastrando..." : "Cadastrar"}
                  </Button>
                </div>
              </form>
              <div className="text-sm font-normal leading-5">
                <span className="text-text-secondary">
                  Já possui uma conta?
                </span>
                <a href="/login">
                  <b className="text-gray-300"> Entrar</b>
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
