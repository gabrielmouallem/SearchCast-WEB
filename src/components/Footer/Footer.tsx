import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 flex items-center bg-background flex-col text-center gap-4 py-12 md:py-8 md:mx-16 md:mb-5 md:text-start md:flex-row">
      <Image
        src="/logo_w_name.svg"
        width={211}
        height={30}
        alt="SearchCast Logo"
      />
      <div className="md:ml-auto text-base font-normal leading-6 text-text-secondary">
        © 2024 SearchCast. Todos os direitos reservados
      </div>
    </footer>
  );
}
