"use client";
import React from "react";
import { Input, Button } from "@/components";
import { Controller } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useForgotPassword } from "../hooks";
import "react-toastify/dist/ReactToastify.css";

export function ForgotPasswordForm() {
  const { loading, handleSubmit, control, errors } = useForgotPassword();

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <ToastContainer />
      <div className="flex items-center justify-center pt-[10vh]">
        <div className="flex items-center justify-center">
          <div className="flex w-full flex-col items-start justify-center gap-8 font-semibold">
            <div className="text-3xl">Mudar Senha</div>
            <div className="-my-3 w-360px bg-background text-base font-light">
              Inclua o endereço de email associado à sua conta e nós enviaremos
              um email com instruções para redefinir sua senha.
            </div>
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
                </div>
                <Button
                  type="submit"
                  className={`w-360px !bg-brand ${loading ? "opacity-50" : ""}`}
                  disabled={loading}
                >
                  {loading ? "..." : "Requisitar redefinição de senha"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
