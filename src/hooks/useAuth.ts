import { getDecodedJWT } from "@/utils"; // Import encodeToJWT function for creating JWT
import { useCookies } from ".";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  subscription?: {
    cancel_at: number;
    current_period_end: number;
    plan: "month" | "semester" | "year";
  };
  allow_unpaid_access: boolean;
  created_on: string;
  email: string;
  name: string;
}

export function useAuth() {
  const { getCookie, updateCookie } = useCookies("access_token", "");
  const router = useRouter();

  const user = getDecodedJWT<any>(getCookie())?.sub as User | undefined;

  function clearAccessToken() {
    updateCookie("", 1);
  }

  function handleLogout() {
    updateCookie("", 1);
    router.push("/login");
  }

  return {
    user,
    handleLogout,
    clearAccessToken,
  };
}
