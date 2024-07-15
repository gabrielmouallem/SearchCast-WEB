"use client";
import React from "react";
import { Input, Button } from "@/components"; // Adjust the path as needed
import { Controller } from "react-hook-form";
import { Navbar, Footer } from "@/components"; // Assuming these components exist
import { useLogin } from "@/hooks";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { GoogleLoginButton } from "@/components/GoogleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";

export function LoginForm() {
  const { loading, handleSubmit, control } = useLogin();

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <ToastContainer />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-grow items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="flex w-full flex-col items-center justify-center gap-8 font-semibold">
              <div className="text-center text-3xl">Faça o seu login</div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="flex flex-col items-center justify-center gap-5 text-3xl font-semibold leading-9">
                    <div>
                      <div className="mb-[5px] text-sm font-medium leading-5 text-gray-300">
                        Email
                      </div>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <Input
                            className="w-360px"
                            type="email"
                            placeholder="Email"
                            {...field}
                          />
                        )}
                      />
                    </div>
                    <div>
                      <div className="mb-[5px] text-sm font-medium leading-5 text-gray-300">
                        Senha
                      </div>
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <Input
                            className="w-360px"
                            type="password"
                            placeholder="Senha"
                            {...field}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex w-360px items-center justify-between text-sm font-normal leading-5">
                    <div>
                      <label className="inline-flex items-center">
                        <input type="checkbox" />
                        <span className="ml-2">Lembrar-me por 30 dias</span>
                      </label>
                    </div>
                    <div>
                      <a href="/forgot-password" className="text-gray-300">
                        <b>Esqueci a senha</b>
                      </a>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className={`w-360px !bg-brand ${
                      loading ? "opacity-50" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? "Entrando..." : "Entrar"}
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
                <span className="text-text-secondary">Não tem uma conta?</span>
                <a href="/register">
                  <b className="ml-2 text-gray-300">Cadastrar</b>
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
