"use client";
import React from "react";
import { Input, Button } from "@/components"; // Adjust the path as needed
import { Controller } from "react-hook-form";
import { Navbar, Footer } from "@/components"; // Assuming these components exist
import { useLogin, useRedirectToSearchPage } from "@/hooks";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { GoogleLoginButton } from "@/components/GoogleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";

export function LoginForm() {
  const { loading, handleSubmit, control } = useLogin();

  useRedirectToSearchPage();

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <ToastContainer />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <div className="flex items-center justify-center">
            <div className="flex flex-col font-semibold items-center justify-center gap-8 w-full">
              <div className="text-center text-3xl">Faça o seu login</div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="text-3xl font-semibold leading-9 flex flex-col items-center justify-center gap-5">
                    <div>
                      <div className="text-sm text-gray-300 font-medium leading-5">
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
                      <div className="text-sm text-gray-300 font-medium leading-5">
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
                  <div className="w-360px flex items-center justify-between text-sm font-normal leading-5">
                    <div>
                      <label className="inline-flex items-center">
                        <input type="checkbox" />
                        <span className="ml-2">Lembrar-me por 30 dias</span>
                      </label>
                    </div>
                    <div>
                      <a href="#" className="text-gray-300">
                        <b>Esqueci a senha</b>
                      </a>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className={`!bg-brand w-360px ${
                      loading ? "opacity-50" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? "Entrando..." : "Entrar"}
                  </Button>
                  <GoogleLoginButton />
                </div>
              </form>
              <div className="text-sm font-normal leading-5">
                <span className="text-text-secondary">Não tem uma conta?</span>
                <a href="/register">
                  <b className="text-gray-300"> Cadastrar</b>
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
