"use client";
import { Footer, Navbar } from "@/components";
import { useRedirectToLoginPage } from "@/hooks";
import { SearchEngine } from "./components/SearchEngine";
import { Providers } from "@/components/Providers";

export default function Search() {
  useRedirectToLoginPage();

  return (
    <Providers>
      <div className="flex flex-col min-h-screen min-w-screen !bg-default-gradient">
        <Navbar isAuthenticated />
        <SearchEngine />
        <Footer />
      </div>
    </Providers>
  );
}
