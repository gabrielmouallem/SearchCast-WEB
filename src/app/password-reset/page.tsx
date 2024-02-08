"use client";
import { PasswordResetForm } from "./components/PasswordResetForm";
import { Providers } from "@/components/Providers";

export default function Register() {
  return (
    <Providers>
      <PasswordResetForm />
    </Providers>
  );
}
