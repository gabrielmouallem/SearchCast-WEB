import { NextRequest, NextResponse } from "next/server";
import { getAutoSuggestions } from "@/utils/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text");

  if (!text) {
    return NextResponse.json('Missing "text" query parameter', { status: 400 });
  }

  try {
    const suggestions = await getAutoSuggestions(text);

    return NextResponse.json(suggestions.data, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}
