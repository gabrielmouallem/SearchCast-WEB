import { getDecodedJWT } from "@/utils"; // Import encodeToJWT function for creating JWT
import { useCookies } from ".";
import { useRouter } from "next/navigation";
import { User } from "@/types";

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
  }

  return {
    getUser,
    handleLogout,
    clearAccessToken,
  };
}
