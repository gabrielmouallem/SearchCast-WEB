import React from "react";
import { LoginForm } from "./components";
import { Providers } from "@/components/Providers";

export default function Login() {
  return (
    <Providers>
      <LoginForm />
    </Providers>
  );
}
