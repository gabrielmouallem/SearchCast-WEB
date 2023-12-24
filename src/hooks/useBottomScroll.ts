// useBottomScroll.ts
import { useEffect } from "react";

type ScrollCallback = () => void;

const useBottomScroll = (callback: ScrollCallback) => {
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        // You can adjust the threshold (e.g., -10) based on your preference
        callback();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [callback]);
};

export default useBottomScroll;
