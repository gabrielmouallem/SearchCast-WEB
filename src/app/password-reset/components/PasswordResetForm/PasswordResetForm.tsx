"use client";
import React, { Suspense, useEffect } from "react";
import { Input, Button } from "@/components"; // Adjust the path as needed
import { Controller } from "react-hook-form";
import { Navbar, Footer } from "@/components"; // Assuming these components exist
import { usePasswordReset } from "../hooks/usePasswordReset";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter, useSearchParams } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { LoadingFallback } from "@/components/LoadingFallback";

function PasswordResetFormContent() {
  const { loading, handleSubmit, control, errors, watch } = usePasswordReset();

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const watchPassword = watch("password");

  useEffect(() => {
    if (!token) router.push("/login");
  }, [token, router]);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <ToastContainer />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-grow items-center justify-center pb-20 pt-28 md:pb-0 md:pt-0">
          <div className="flex items-center justify-center">
            <div className="flex w-full flex-col items-center justify-center gap-8 font-semibold">
              <div className="text-center text-3xl">Redefinir Senha</div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="flex flex-col items-center justify-center gap-5 text-3xl font-semibold leading-9">
                    <div>
                      <div className="mb-[5px] text-sm font-medium leading-5 text-gray-300">
                        Nova senha
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
                        Confirmar nova senha
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
                            placeholder="Confirmar nova Senha"
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
                  <Button
                    type="submit"
                    className={`w-360px !bg-brand ${
                      loading ? "opacity-50" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? "Redefinindo..." : "Redefinir"}
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

export function PasswordResetForm() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PasswordResetFormContent />
    </Suspense>
  );
}
