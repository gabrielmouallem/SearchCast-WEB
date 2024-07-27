import { getDecodedJWT } from "@/utils/shared"; // Import encodeToJWT function for creating JWT
import { useCookies } from ".";
import { useRouter } from "next/navigation";
import { User } from "@/types";
import posthog from "posthog-js";

export function useAuth() {
  const { getCookie, updateCookie } = useCookies("access_token", "");
  const router = useRouter();

  function getUser() {
    return getDecodedJWT<any>(getCookie())?.sub as User | undefined;
  }

  function clearAccessToken() {
    updateCookie("", 1);
  }

  function handleLogout() {
    updateCookie("", 1);
    router.push("/login");
    posthog.reset();
  }

  return {
    getUser,
    handleLogout,
    clearAccessToken,
  };
}
