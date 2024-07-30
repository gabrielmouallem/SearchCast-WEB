"use client";
import Lottie from "lottie-react";
import logoLottieFile from "../../../public/logo_lottie_animation.json";

interface LoadingFallbackProps {
  height?: string;
}

export function LoadingFallback({ height }: LoadingFallbackProps) {
  return (
    <div
      className={`flex ${height || "h-[100vh]"} w-full items-center justify-center`}
    >
      <Lottie
        style={{ scale: 1.5 }}
        animationData={logoLottieFile}
        loop
        alt="SearchCast Logo"
      />
    </div>
  );
}
