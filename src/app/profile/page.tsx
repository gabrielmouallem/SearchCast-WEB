"use client";
import { Providers } from "@/components/Providers";
import { ProfileForm } from "./components";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  return (
    <Providers>
      <ProfileForm />
    </Providers>
  );
}
