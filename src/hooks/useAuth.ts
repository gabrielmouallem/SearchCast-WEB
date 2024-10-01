import { getDecodedJWT } from "@/utils/shared"; // Import encodeToJWT function for creating JWT
import { useCookies } from ".";
import { useRouter } from "next/navigation";
import { User } from "@/types";
import { createClient } from "@/services/client";

export function useAuth() {
  const { getCookie, updateCookie } = useCookies("access_token", "");
  const router = useRouter();

  function getUser() {
    return getDecodedJWT<any>(getCookie()) as User | undefined;
  }

  function clearAccessToken() {
    updateCookie("", 1);
  }

  async function handleLogout() {
    await createClient().auth.signOut();
    clearAccessToken();
    router.push("/login");
  }

  return {
    getUser,
    handleLogout,
    clearAccessToken,
  };
}
