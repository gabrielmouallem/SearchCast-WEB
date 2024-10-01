import { createClient } from "@/services/server";
import { NextRequest, NextResponse } from "next/server";

interface ForgotPasswordRequestBody {
  email: string;
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const body: ForgotPasswordRequestBody = await req.json();

  // Get the origin from the request headers
  const origin = req.headers.get("origin") || "";

  // Construct the redirect URL
  const redirectTo = `${origin}/password-reset`;

  const { data, error } = await supabase.auth.resetPasswordForEmail(
    body.email,
    { redirectTo },
  );

  if (data) return NextResponse.json({ message: "Password reset email sent." });
  return NextResponse.json(error, { status: error?.status ?? 500 });
}
