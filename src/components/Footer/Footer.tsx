import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative flex flex-col items-center gap-4 bg-background py-12 text-center md:flex-row md:px-16 md:py-8 md:text-start">
      <div className="absolute inset-0 mx-14 border-t border-gray-800" />
      <Image
        src="/logo_w_name.svg"
        width={211}
        height={30}
        alt="SearchCast Logo"
      />
      <div className="text-base font-normal leading-6 text-text-secondary md:ml-auto">
        © 2024 SearchCast. Todos os direitos reservados
      </div>
    </footer>
  );
}
