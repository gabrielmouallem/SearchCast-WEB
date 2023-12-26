import { jwtDecode } from "jwt-decode";

export function getDecodedJWT(access_token: string) {
  try {
    const decoded = jwtDecode(access_token); // Replace 'your-secret-key' with your actual secret key
    return decoded;
  } catch (error) {
    console.log("Error decoding JWT:", error);
    return null;
  }
}
