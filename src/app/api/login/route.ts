import { createClient } from "@/services/server";
import { NextRequest, NextResponse } from "next/server";

interface Login {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const body: Login = await req.json();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: body.email,
    password: body.password,
  });

  if (data.session) return NextResponse.json(data);
  return NextResponse.json(error, { status: error?.status ?? 500 });
}
