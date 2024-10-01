"use server";
import { cookies } from "next/headers";
import { User } from "@/types";
import { createClient } from "@/services/server";

export async function getUser(): Promise<User | undefined> {
  const supabase = createClient();
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("access_token")?.value;
  const { data } = await supabase.auth.getUser(accessToken);

  if (data?.user) {
    // Check if user_metadata has display_name but not full_name
    if (
      data.user.user_metadata?.display_name &&
      !data.user.user_metadata?.full_name
    ) {
      data.user.user_metadata.full_name = data.user.user_metadata.display_name;
    }
    return data.user as User;
  }

  return undefined;
}
