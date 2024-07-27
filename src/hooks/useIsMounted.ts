import { useLayoutEffect, useState } from "react";

/**
 * Custom hook to determine if a component is mounted.
 *
 * This hook sets a state variable `isMounted` to `true` after the component
 * has been mounted. It can be used to prevent rendering or running code
 * that should only execute on the client-side, thereby avoiding hydration errors.
 *
 * @returns {boolean} `true` if the component is mounted, `false` otherwise.
 *
 * @example
 * const isMounted = useIsMounted();
 *
 * if (!isMounted) {
 *   return null; // Render nothing on the server
 * }
 */
export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}
