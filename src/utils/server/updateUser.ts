import { cookies } from "next/headers";
import { User } from "@/types";
import { createClient } from "@/services/server";
import { getDecodedJWT } from "@/utils/shared";
import { encodeToJWT, setAccessToken } from "@/utils/server";
import { NextRequest } from "next/server";

export async function updateUser(
  req: NextRequest,
  user: User,
  updates: Partial<User["user_metadata"]>,
): Promise<User | undefined> {
  const supabase = createClient();
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("access_token")?.value;

  if (!accessToken) {
    return undefined;
  }

  // Update user metadata
  const { data: updatedUser, error } = await supabase.auth.updateUser({
    data: { ...user.user_metadata, ...updates },
  });

  if (error || !updatedUser.user) {
    console.error("Error updating user:", error);
    return undefined;
  }

  // Decode the current access token
  const decodedToken = getDecodedJWT<any>(accessToken);
  if (!decodedToken) {
    return undefined;
  }

  // Create a new access token with updated user metadata
  const newAccessToken = encodeToJWT(
    { ...decodedToken, user_metadata: updatedUser.user.user_metadata },
    process.env.SUPABASE_JWT_SECRET,
  );
  // Update the access token in cookies
  setAccessToken(req, newAccessToken);

  return updatedUser.user as User;
}
