"use client";
import { Footer, Navbar } from "@/components";
import { useRedirectToLoginPage, useRedirectToPaymentPage } from "@/hooks";
import { Providers } from "@/components/Providers";
import { ProfileForm } from "./components";

export default function Search() {
  useRedirectToLoginPage();
  useRedirectToPaymentPage();

  return (
    <Providers>
      <div className="flex flex-col min-h-screen min-w-screen bg-background">
        <Navbar isAuthenticated />
        <ProfileForm />
        <Footer />
      </div>
    </Providers>
  );
}
