import { createClient } from "@/services/server";
import { NextRequest, NextResponse } from "next/server";
import { getDecodedJWT } from "@/utils/shared"; // Assuming you have an encodeToJWT function
import { encodeToJWT, getAccessToken, setAccessToken } from "@/utils/server"; // Assuming you have an encodeToJWT function
import { User } from "@/types";

export async function GET(req: NextRequest) {
  const supabase = createClient();
  // Get the access token from cookies
  const access_token = getAccessToken(req);

  if (!access_token) {
    return NextResponse.json(
      { error: "Access token not found" },
      { status: 401 },
    );
  }

  // Decode the access token to get user metadata
  const decodedToken = getDecodedJWT<any>(access_token);
  if (!decodedToken) {
    return NextResponse.json(
      { error: "Invalid access token" },
      { status: 401 },
    );
  }

  const user_metadata = (
    (await supabase.auth.getUser(access_token)).data.user as User
  )?.user_metadata;

  if (!user_metadata) {
    return NextResponse.json(
      { error: "User metadata not found" },
      { status: 404 },
    );
  }

  // Encode the updated user_metadata back into a new access token
  const new_access_token = encodeToJWT(
    { ...decodedToken, user_metadata },
    process.env.SUPABASE_JWT_SECRET,
  );

  // Set the new access token in cookies
  setAccessToken(req, new_access_token);

  return NextResponse.json({
    access_token: new_access_token,
  });
}
