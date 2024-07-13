"use client";
import Lottie from "lottie-react";
import logoLottieFile from "../../../public/logo_lottie_animation.json";

export function LoadingFallback() {
  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
      <Lottie
        style={{ scale: 1.5 }}
        animationData={logoLottieFile}
        loop
        alt="SearchCast Logo"
      />
    </div>
  );
}
