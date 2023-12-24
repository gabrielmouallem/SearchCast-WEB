"use client";
import { Footer, Navbar } from "@/components";
import { SearchInput } from "@/components/SearchInput";
import { useCookies } from "@/hooks";
import { RedirectType, redirect } from "next/navigation";
import Image from "next/image";
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
    <div className="flex flex-col min-h-screen min-w-screen bg-default-gradient">
      <Navbar isAuthenticated />
      <div className="flex-grow flex flex-col justify-center items-center gap-8">
        <Image src="/logo.svg" width={48} height={29.5} alt="SearchCast Logo" />
        <div>
          <SearchInput />
        </div>
      </div>
      <Footer />
    </div>
  );
}
