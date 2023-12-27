import { jwtDecode } from "jwt-decode";

export function getDecodedJWT<T>(access_token: string) {
  if (!access_token) return null;
  try {
    const decoded = jwtDecode(access_token); // Replace 'your-secret-key' with your actual secret key
    return decoded as T;
  } catch (error) {
    console.log("Error decoding JWT:", error);
    return null;
  }
}
