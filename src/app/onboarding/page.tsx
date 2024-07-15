"use client";
import { Providers } from "@/components/Providers";
import { Onboarding } from "./components/Onboarding";
import { useIdentifyUser } from "@/hooks";
import { Navbar } from "@/components";
import { useSkipOnboarding } from "./hooks/useSkipOnboarding";

export default function OnboardingPage() {
  useIdentifyUser();

  const isSkipOnboarding = useSkipOnboarding();

  return (
    <Providers>
      {isSkipOnboarding && <Navbar isAuthenticated />}
      <Onboarding />
    </Providers>
  );
}
