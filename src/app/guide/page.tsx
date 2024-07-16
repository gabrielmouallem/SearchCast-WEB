"use client";
import { Navbar } from "@/components";
import { GuideContent } from "./components/GuideContent";
import { useUser } from "@/hooks";

export default function Guide() {
  const user = useUser();

  const isAuthenticated = !!user;

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <GuideContent />
    </>
  );
}
