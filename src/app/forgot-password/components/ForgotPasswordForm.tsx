"use client";
import React from "react";
import { Input, Button } from "@/components"; // Adjust the path as needed
import { Controller } from "react-hook-form";
import { Navbar, Footer } from "@/components"; // Assuming these components exist
import { useRedirectToLoginPage } from "@/hooks";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useForgotPassword } from "../hooks";
import "react-toastify/dist/ReactToastify.css";

export function ForgotPasswordForm() {
  const { loading, handleSubmit, control, done } = useForgotPassword();

  useRedirectToLoginPage("ATTEMPT_TO_ACCESS_FORGOT_PASSWORD_LOGGED_IN");

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <ToastContainer />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <div className="flex items-center justify-center">
            <div className="flex flex-col font-semibold items-start justify-center gap-8 w-full">
              <div className="text-3xl">Mudar Senha</div>
              <div className="font-light text-base w-360px bg-background -my-3">
                Inclua o endereço de email associado à sua conta e nós
                enviaremos um email com instruções para redefinir sua senha.
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="text-3xl font-semibold leading-9 flex flex-col items-center justify-center gap-5">
                    <div>
                      <div className="text-sm text-gray-300 font-medium leading-5 mb-[5px]">
                        Email
                      </div>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <Input
                            className="w-360px"
                            type="email"
                            placeholder="alan.turing@email.com"
                            {...field}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className={`!bg-brand w-360px ${
                      loading ? "opacity-50" : ""
                    }`}
                    disabled={loading || done}
                  >
                    {loading ? "..." : "Requisitar redefinição de senha"}
                    {!!(!loading && done) && "Instruções enviadas"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </GoogleOAuthProvider>
  );
}
