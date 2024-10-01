import { NextRequest } from "next/server";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

function getAccessToken(req: NextRequest) {
  return (req.cookies as RequestCookies).get("access_token")?.value;
}

function setAccessToken(req: NextRequest, value: string) {
  const cookies = req.cookies as RequestCookies;
  cookies.set("access_token", value);
}

export { getAccessToken, setAccessToken };
