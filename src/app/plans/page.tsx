"use client";
import { Providers } from "@/components/Providers";
import { Plans } from "./components/Plans";
import { useIdentifyUser } from "@/hooks";

export default function PlansPage() {
  useIdentifyUser(); // important to idenfity the user right after the login when the user has no active plans and will be redirected to plans page
  return (
    <Providers>
      <Plans />
    </Providers>
  );
}
