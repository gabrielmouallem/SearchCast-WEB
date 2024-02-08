"use client";
import React from "react";
import { Input, Button } from "@/components"; // Adjust the path as needed
import { Controller } from "react-hook-form";
import { Navbar, Footer } from "@/components"; // Assuming these components exist
import { useRedirectToSearchPage, useRegister } from "@/hooks";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { GoogleLoginButton } from "@/components/GoogleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";

export function RegisterForm() {
  const { loading, handleSubmit, control, errors, watch } = useRegister();

  const watchEmail = watch("email");
  const watchPassword = watch("password");

  useRedirectToSearchPage();

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <ToastContainer />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex justify-center items-center pt-28 pb-20 md:pt-0 md:pb-0">
          <div className="flex items-center justify-center">
            <div className="flex flex-col font-semibold items-center justify-center gap-8 w-full">
              <div className="text-center text-3xl">Cadastre-se</div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="text-3xl font-semibold leading-9 flex flex-col items-center justify-center gap-5">
                    <div>
                      <div className="text-sm text-gray-300 font-medium leading-5 mb-[5px]">
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
                      {errors.name && (
                        <div className="text-xs text-red-600 font-light">
                          {errors.name.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm text-gray-300 font-medium leading-5 mb-[5px]">
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
                      <div className="text-sm text-gray-300 font-medium leading-5 mb-[5px]">
                        Confirmar Email
                      </div>
                      <Controller
                        name="confirmEmail"
                        control={control}
                        rules={{
                          required: "Confirmação de email é obrigatória",
                          validate: (value) =>
                            value === watchEmail || "Os emails não coincidem",
                        }}
                        render={({ field }) => (
                          <Input
                            className="w-360px"
                            type="email"
                            placeholder="Confirmar Email"
                            {...field}
                          />
                        )}
                      />
                      {errors.confirmEmail && (
                        <div className="text-xs text-red-600 font-light">
                          {errors.confirmEmail.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm text-gray-300 font-medium leading-5 mb-[5px]">
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
                    <div>
                      <div className="text-sm text-gray-300 font-medium leading-5 mb-[5px]">
                        Confirmar Senha
                      </div>
                      <Controller
                        name="confirmPassword"
                        control={control}
                        rules={{
                          required: "Confirmação de senha é obrigatória",
                          validate: (value) =>
                            value === watchPassword ||
                            "As senhas não coincidem",
                        }}
                        render={({ field }) => (
                          <Input
                            className="w-360px"
                            type="password"
                            placeholder="Confirmar Senha"
                            {...field}
                          />
                        )}
                      />
                      {errors.confirmPassword && (
                        <div className="text-xs text-red-600 font-light">
                          {errors.confirmPassword.message}
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
                  <GoogleLoginButton />
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
    </GoogleOAuthProvider>
  );
}
