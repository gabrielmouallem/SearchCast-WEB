"use client";
import { Footer, Navbar } from "@/components";
import { useCookies } from "@/hooks";
import { RedirectType, redirect } from "next/navigation";
import { useEffect } from "react";

export default function Search() {
  const cookies = useCookies("access_token", "");

  useEffect(() => {
    const access_token = cookies.getCookie();
    const accessTokenIsEmpty = access_token === "";
    const accessTokenIsUndefined = !access_token;

    const shouldRedirectToLoginPage =
      accessTokenIsEmpty || accessTokenIsUndefined;

    if (shouldRedirectToLoginPage) redirect("/login", RedirectType.replace);
  }, [cookies.getCookie]);

  return (
    <>
      <Navbar isAuthenticated />
      <div className="min-h-screen" />
      <Footer />
    </>
  );
}
