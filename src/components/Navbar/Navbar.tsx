"use client";
import Image from "next/image";
import { Button } from "../Button";
import { ComponentProps } from "react";
import { useAuth } from "@/hooks/useAuth";

const imageProps: ComponentProps<typeof Image> = {
  className: "mr-2",
  src: "/person_icon.svg",
  width: 20,
  height: 20,
  alt: "",
};

interface NavbarProps {
  isAuthenticated?: boolean;
}

export function Navbar({ isAuthenticated }: NavbarProps) {
  const { handleLogout } = useAuth();

  return (
    <nav
      className="fixed inset-0 w-full h-20 sm:pl-20 sm:pr-20 flex items-center bg-gradient-to-b from-black-transparent to-transparent"
      p-
    >
      <a href="/">
        <Image
          className="ml-8"
          src="/logo_w_name.svg"
          width={211}
          height={30}
          alt="SearchCast Logo"
        />
      </a>
      {!isAuthenticated && (
        <div className="ml-auto mr-9">
          <a href="/login">
            <Button startIcon={<Image {...imageProps} alt="Person Icon" />}>
              Acessar
            </Button>
          </a>
        </div>
      )}
      {isAuthenticated && (
        <div className="ml-auto mr-9">
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      )}
    </nav>
  );
}
