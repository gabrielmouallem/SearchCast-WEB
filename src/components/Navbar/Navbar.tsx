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
  restrictedMode?: boolean;
}

export function Navbar({ isAuthenticated, restrictedMode }: NavbarProps) {
  return (
    <nav className="fixed inset-0 z-50 flex h-20 w-full items-center bg-gradient-to-b from-black-transparent to-transparent sm:pl-20 sm:pr-20">
      <a href="/">
        <Image
          className="ml-8"
          src="/logo_w_name.svg"
          width={211}
          height={30}
          alt="SearchCast Logo"
        />
      </a>
      {!!(!isAuthenticated && !restrictedMode) && (
        <div className="ml-auto mr-9">
          <a href="/login">
            <Button startIcon={<Image {...imageProps} alt="Person Icon" />}>
              Acessar
            </Button>
          </a>
        </div>
      )}
      {!!isAuthenticated && (
        <div className="ml-auto mr-9 cursor-pointer">
          <ProfilePopover restrictedMode={restrictedMode} />
        </div>
      )}
    </nav>
  );
}
