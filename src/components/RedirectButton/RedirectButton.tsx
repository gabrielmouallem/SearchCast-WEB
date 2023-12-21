"use client";
import Image from "next/image";

const arrowImageProps: React.ComponentProps<typeof Image> = {
  src: "/arrow_right_icon.svg",
  width: 16,
  height: 16,
  alt: "",
};

const dotImageProps: React.ComponentProps<typeof Image> = {
  src: "/dot_icon.svg",
  width: 14,
  height: 14,
  alt: "",
};

interface RedirectButtonProps {
  onClick?: () => void;
}

export function RedirectButton({ onClick = () => null }: RedirectButtonProps) {
  return (
    <button
      className="bg-background pr-2 p-0.5 rounded-lg border border-border flex gap-2.5 items-center justify-center"
      onClick={onClick}
    >
      <div className="flex items-center justify-center h-6 gap-1 rounded-md border border-border p-1.5 text-gray-300 text-sm font-medium">
        <Image {...dotImageProps} alt="Ponto" />
        Nova função
      </div>
      <div className="flex items-center justify-center text-gray-300 text-sm font-medium gap-1">
        Sugestões de busca
        <Image {...arrowImageProps} alt="Seta para direita" />
      </div>
    </button>
  );
}
