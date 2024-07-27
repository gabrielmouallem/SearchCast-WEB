import Head from "next/head";
import { SkipOnboardingProvider } from "./hooks/useSkipOnboarding";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SkipOnboardingProvider>
      <Head>
        <title>SearchCast - Bem-vindo!</title>
      </Head>
      {children}
    </SkipOnboardingProvider>
  );
}
