import { cookies } from "next/headers";
import { getDecodedJWT } from "@/utils/shared"; // Adjust the import path as needed
import { User } from "@/types";

export function getUser(): User | undefined {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("access_token")?.value;

  if (accessToken) {
    return getDecodedJWT<any>(accessToken)?.sub as User | undefined;
  }

  return undefined;
}
