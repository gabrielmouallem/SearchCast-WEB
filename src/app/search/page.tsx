"use client";
import { Footer, Navbar } from "@/components";
import { SearchEngine } from "./components/SearchEngine";
import { Providers } from "@/components/Providers";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";

function SearchContent() {
  return (
    <Providers>
      <ToastContainer />
      <div className="min-w-screen flex min-h-screen flex-col !bg-default-gradient">
        <Navbar isAuthenticated />
        <SearchEngine />
        <Footer />
      </div>
    </Providers>
  );
}

export function Search() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[100vh] w-full items-center justify-center">
          Carregando...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
