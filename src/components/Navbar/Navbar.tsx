import Image from "next/image";
import { Button } from "../Button";
import { ComponentProps } from "react";

const imageProps: ComponentProps<typeof Image> = {
  className: "mr-2",
  src: "/person_icon.svg",
  width: 20,
  height: 20,
  alt: "",
};

export function Navbar() {
  return (
    <nav
      className="fixed inset-0 w-full h-20 sm:pl-20 sm:pr-20 flex items-center bg-gradient-to-b from-black-transparent to-transparent"
      p-
    >
      <Image
        className="ml-8"
        src="/logo_w_name.svg"
        width={211}
        height={30}
        alt="SearchCast Logo"
      />
      <div className="ml-auto mr-9">
        <Button startIcon={<Image {...imageProps} alt="Person Icon" />}>
          Login
        </Button>
      </div>
    </nav>
  );
}
