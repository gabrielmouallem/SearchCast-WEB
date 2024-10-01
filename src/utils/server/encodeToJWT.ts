import jwt from "jsonwebtoken";

export function encodeToJWT(
  payload: any,
  secretKey: string,
  options?: jwt.SignOptions,
) {
  return jwt.sign(payload, secretKey, options);
}
