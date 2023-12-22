"use client";
import { MotionProps, motion } from "framer-motion";
import Image from "next/image";
import React from "react"; // Don't forget to import React

const dotMotionProps: MotionProps = {
  initial: {
    scale: 1,
    opacity: 0.8,
  },
  animate: {
    scale: [1, 1.2, 1, 1.2, 1], // Add an array of values for the scale to create an animation loop
    opacity: [0.8, 1, 0.8, 1, 0.8], // Add an array of values for opacity
    transition: {
      duration: 2, // Adjust the duration as needed
      repeat: Infinity, // Infinite loop
      repeatType: "loop", // Type of repeat (loop or reverse)
      ease: "linear", // Easing function
    },
  },
};

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
        <motion.div {...dotMotionProps}>
          <Image {...dotImageProps} alt="Ponto" />
        </motion.div>
        Nova função
      </div>
      <div className="flex items-center justify-center text-gray-300 text-sm font-medium gap-1">
        Sugestões de busca
        <Image {...arrowImageProps} alt="Seta para direita" />
      </div>
    </button>
  );
}
