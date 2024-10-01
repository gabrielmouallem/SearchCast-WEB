"use server";
import { cookies } from "next/headers";
import { User } from "@/types";
import { createClient } from "@/services/server";

export async function getUser(): Promise<User | undefined> {
  const supabase = createClient();
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("access_token")?.value;
  const { data } = await supabase.auth.getUser(accessToken);

  if (data?.user) return data.user as User;

  return undefined;
}
