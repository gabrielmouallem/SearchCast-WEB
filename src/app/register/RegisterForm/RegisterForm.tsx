"use client";
import React from "react";
import { Input, Button } from "@/components"; // Adjust the path as needed
import { Controller } from "react-hook-form";
import { useRegister } from "@/hooks";
import { ToastContainer } from "react-toastify";
import { GoogleLoginButton } from "@/components/GoogleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";

export function RegisterForm() {
  const { loading, handleSubmit, control, errors, watch } = useRegister();

  const watchEmail = watch("email");
  const watchPassword = watch("password");

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <ToastContainer />
      <div className="flex flex-col md:pt-4">
        <div className="flex flex-grow items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="flex w-full flex-col items-center justify-center gap-8 pb-14 font-semibold">
              <div className="text-center text-3xl">Cadastre-se</div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="flex flex-col items-center justify-center gap-5 text-3xl font-semibold leading-9">
                    <div>
                      <div className="mb-[5px] text-sm font-medium leading-5 text-gray-300">
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
                        <div className="text-xs font-light text-red-600">
                          {errors.name.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="mb-[5px] text-sm font-medium leading-5 text-gray-300">
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
                        <div className="text-xs font-light text-red-600">
                          {errors.email.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="mb-[5px] text-sm font-medium leading-5 text-gray-300">
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
                            autoComplete="new-email"
                            {...field}
                          />
                        )}
                      />
                      {errors.confirmEmail && (
                        <div className="text-xs font-light text-red-600">
                          {errors.confirmEmail.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="mb-[5px] text-sm font-medium leading-5 text-gray-300">
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
                        <div className="text-xs font-light text-red-600">
                          {errors.password.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="mb-[5px] text-sm font-medium leading-5 text-gray-300">
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
                            autoComplete="new-password"
                            {...field}
                          />
                        )}
                      />
                      {errors.confirmPassword && (
                        <div className="text-xs font-light text-red-600">
                          {errors.confirmPassword.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex w-360px items-center justify-between text-sm font-normal leading-5">
                    <div>
                      <label className="inline-flex items-center">
                        <input type="checkbox" />
                        <span className="ml-2">Lembrar-me por 30 dias</span>
                      </label>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className={`w-360px !bg-brand ${
                      loading ? "opacity-50" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? "Cadastrando..." : "Cadastrar"}
                  </Button>
                  <GoogleLoginButton />
                </div>
              </form>
              <div className="w-360px text-center text-sm font-normal leading-5">
                <span className="text-text-secondary">
                  Ao utilizar a plataforma SearchCast, você declara ter lido e
                  aceitado a nossa{" "}
                  <a href="/privacy-policy" target="_blank">
                    <b className="text-gray-300">Política de Privacidade</b>
                  </a>
                  .
                </span>
              </div>
              <div className="text-sm font-normal leading-5">
                <span className="text-text-secondary">
                  Já possui uma conta?
                </span>
                <a href="/login">
                  <b className="ml-2 text-gray-300">Entrar</b>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
