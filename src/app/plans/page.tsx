"use client";
import { Providers } from "@/components/Providers";
import { Plans } from "./components/Plans";
import { useRedirectToLoginPage } from "@/hooks";

export default function PlansPage() {
  useRedirectToLoginPage();

  return (
    <Providers>
      <Plans />
    </Providers>
  );
}
