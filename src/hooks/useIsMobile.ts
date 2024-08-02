import { useEffect, useState } from "react";

// Define the default screen width for mobile according to TailwindCSS 'sm' breakpoint
const MOBILE_SCREEN_WIDTH = 640;

export function useIsMobile(checkBy = "device") {
  const [isMobile, setIsMobile] = useState(() => {
    if (checkBy === "device") {
      const { userAgent } = navigator;
      return /android|ipad|iphone|ipod/.test(userAgent.toLowerCase());
    } else if (checkBy === "screen") {
      return window.innerWidth <= MOBILE_SCREEN_WIDTH;
    }
    return false;
  });

  useEffect(() => {
    if (checkBy === "screen") {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= MOBILE_SCREEN_WIDTH);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [checkBy]);

  return isMobile;
}
