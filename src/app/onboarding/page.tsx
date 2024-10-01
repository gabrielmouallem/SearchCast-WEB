"use client";
import { Providers } from "@/components/Providers";
import { OnboardingContent } from "./components/OnboardingContent";
import { useIdentifyUser } from "@/hooks";
import { Navbar } from "@/components";
import { useSkipOnboarding } from "./hooks/useSkipOnboarding";
import { useQueryState } from "next-usequerystate";
import { Suspense } from "react";
import { LoadingFallback } from "@/components/LoadingFallback";

const useIsRestrictedMode = () => {
  const [initialStep] = useQueryState("initialStep", {
    defaultValue: "1",
  });
  useIdentifyUser();

  const { skipOnboarding } = useSkipOnboarding();

  const isRestrictedMode = !skipOnboarding && initialStep !== "3";

  return isRestrictedMode;
};

function OnboardingContentWrapper() {
  const isRestrictedMode = useIsRestrictedMode();

  return (
    <Providers>
      <Navbar isAuthenticated restrictedMode={isRestrictedMode} />
      <OnboardingContent />
    </Providers>
  );
}

export default function Onboarding() {
  return (
    <Suspense
      fallback={
        <div className="-mt-[20vh] flex min-h-screen">
          <LoadingFallback />
        </div>
      }
    >
      <OnboardingContentWrapper />
    </Suspense>
  );
}
