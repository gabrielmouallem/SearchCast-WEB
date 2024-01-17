import jwtEncode from "jwt-encode";

// Replace 'your-secret-key' with your actual secret key
const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;

export function encodeToJWT(payload: any): string {
  try {
    const token = jwtEncode(payload, secretKey);
    return token;
  } catch (error) {
    console.log("Error encoding to JWT:", error);
    throw error;
  }
}
