"use server";
import { cookies } from "next/headers";
import { getDecodedJWT } from "@/utils/shared"; // Adjust the import path as needed
import { User } from "@/types";

export async function getUser(): Promise<User | undefined> {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("access_token")?.value;

  if (accessToken) {
    return getDecodedJWT<any>(accessToken)?.sub as User | undefined;
  }

  return undefined;
}
