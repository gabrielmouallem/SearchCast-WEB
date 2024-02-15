"use client";
import { Footer, Navbar } from "@/components";
import { Providers } from "@/components/Providers";
import { ProfileForm } from "./components";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
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
