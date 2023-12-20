import Image from "next/image";

export function Navbar() {
  return (
    <nav
      className="fixed inset-0 w-full h-20 sm:pl-20 sm:pr-20 flex items-center"
      p-
    >
      <Image
        src="/logo_w_name.svg"
        width={211}
        height={30}
        alt="Picture of the author"
      />
    </nav>
  );
}
