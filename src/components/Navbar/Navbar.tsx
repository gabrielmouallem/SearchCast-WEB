import Image from "next/image";
import { Button } from "../Button";
import { ComponentProps } from "react";
import { ProfilePopover } from "./components/ProfilePopover";

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
  return (
    <nav className="fixed inset-0 z-50 flex h-20 w-screen items-center justify-center bg-gradient-to-b from-black-transparent to-transparent px-8 backdrop-blur-[1px]">
      <div className="flex w-full items-center justify-center md:px-20">
        <a href={isAuthenticated ? "/search" : "/"}>
          <Image
            className="hidden sm:block"
            src="/logo_w_name.svg"
            width={211}
            height={30}
            alt="SearchCast Logo"
          />
          <Image
            className="block sm:hidden"
            src="/logo.svg"
            width={50}
            height={30}
            alt="SearchCast Logo"
          />
        </a>
        {!isAuthenticated && (
          <div className="ml-auto">
            <a href="/login">
              <Button startIcon={<Image {...imageProps} alt="Person Icon" />}>
                Acessar
              </Button>
            </a>
          </div>
        )}
        {isAuthenticated && (
          <div className="ml-auto">
            <ProfilePopover />
          </div>
        )}
      </div>
    </nav>
  );
}
