import Image from "next/image";

export function Footer() {
  return (
    <footer
      className="border-t border-gray-800 h-20 flex items-center bg-background mx-28 mb-5"
      p-
    >
      <Image
        src="/logo_w_name.svg"
        width={211}
        height={30}
        alt="SearchCast Logo"
      />
      <div className="ml-auto text-base font-normal leading-6 text-text-secondary">
        © 2024 SearchCast. Todos os direitos reservados
      </div>
    </footer>
  );
}
