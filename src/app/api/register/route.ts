import { createClient } from "@/services/server";
import { NextRequest, NextResponse } from "next/server";

interface RegisterRequestBody {
  email: string;
  password: string;
  name: string;
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const body: RegisterRequestBody = await req.json();

  const { data, error } = await supabase.auth.signUp({
    email: body.email,
    password: body.password,
    options: {
      data: {
        display_name: body.name,
      },
    },
  });

  if (data) return NextResponse.json(data);
  return NextResponse.json(error, { status: error?.status });
}
