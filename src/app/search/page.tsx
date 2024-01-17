"use client";
import { Footer, Navbar } from "@/components";
import { useRedirectToLoginPage, useRedirectToPaymentPage } from "@/hooks";
import { SearchEngine } from "./components/SearchEngine";
import { Providers } from "@/components/Providers";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function Search() {
  useRedirectToLoginPage();
  useRedirectToPaymentPage();

  return (
    <Providers>
      <ToastContainer />
      <div className="flex flex-col min-h-screen min-w-screen !bg-default-gradient">
        <Navbar isAuthenticated />
        <SearchEngine />
        <Footer />
      </div>
    </Providers>
  );
}
