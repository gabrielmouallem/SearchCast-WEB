import { createClient } from "@/services/server";
import { NextRequest, NextResponse } from "next/server";

interface ResetPasswordRequestBody {
  code: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const body: ResetPasswordRequestBody = await req.json();

  try {
    const { data: _sessionData, error: sessionError } =
      await supabase.auth.exchangeCodeForSession(body.code);

    if (sessionError) {
      return NextResponse.json(sessionError, {
        status: sessionError?.status ?? 400,
      });
    }

    const { data: _updateUserData, error: updateUserError } =
      await supabase.auth.updateUser({
        password: body.password,
      });

    if (updateUserError) {
      return NextResponse.json(updateUserError, {
        status: updateUserError?.status ?? 400,
      });
    }

    return NextResponse.json({ message: "Password has been reset." });
  } catch (error) {
    return NextResponse.json(error, { status: (error as any)?.status ?? 500 });
  }
}
