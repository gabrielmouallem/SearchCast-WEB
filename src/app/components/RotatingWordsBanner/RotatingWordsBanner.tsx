"use client";
import { useEffect, useState } from "react";

interface RotatingWordsBannerProps {
  words: string[];
}

export function RotatingWordsBanner({ words }: RotatingWordsBannerProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div
      className="mx-auto -mb-3 mt-3 max-w-4xl text-center text-3xl font-semibold leading-relaxed leading-tight tracking-tight text-text-primary sm:mb-6 sm:mt-5 md:text-6xl"
      style={{ lineHeight: "1.1" }}
    >
      Encontre o podcast perfeito{" "}
      <span className="relative inline-block h-10">
        com <span style={{ opacity: 0 }}>agilidade</span>&nbsp;
        {words.map((word, index) => (
          <span
            key={index}
            className={`absolute left-[33%] transform transition-opacity duration-1000 ${
              index === currentWordIndex
                ? "animate-slideDown"
                : "animate-slideUp"
            }`}
            style={{ whiteSpace: "nowrap" }}
          >
            {word}
          </span>
        ))}
      </span>
    </div>
  );
}
