"use client";
import React, { useEffect } from "react";
import { Input, Button } from "@/components"; // Adjust the path as needed
import { Controller } from "react-hook-form";
import { Navbar, Footer } from "@/components"; // Assuming these components exist
import { useRegister } from "@/hooks";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter, useSearchParams } from "next/navigation";
import { usePasswordReset } from "../hooks/usePasswordReset";

export function PasswordResetForm() {
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
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex justify-center items-center pt-28 pb-20 md:pt-0 md:pb-0">
          <div className="flex items-center justify-center">
            <div className="flex flex-col font-semibold items-center justify-center gap-8 w-full">
              <div className="text-center text-3xl">Redefinir Senha</div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="text-3xl font-semibold leading-9 flex flex-col items-center justify-center gap-5">
                    <div>
                      <div className="text-sm text-gray-300 font-medium leading-5 mb-[5px]">
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
                        <div className="text-xs text-red-600 font-light">
                          {errors.password.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm text-gray-300 font-medium leading-5 mb-[5px]">
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
                        <div className="text-xs text-red-600 font-light">
                          {errors.confirmPassword.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className={`!bg-brand w-360px ${
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
