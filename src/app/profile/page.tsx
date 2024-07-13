"use client";
import { Footer, Navbar } from "@/components";
import { Providers } from "@/components/Providers";
import { ProfileForm } from "./components";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  return (
    <Providers>
      <div className="min-w-screen flex min-h-screen flex-col bg-background">
        <Navbar isAuthenticated />
        <ProfileForm />
        <Footer />
      </div>
    </Providers>
  );
}
