import { getApiURL } from ".";

export async function getRefreshedAccessToken(
  access_token: string,
): Promise<{ access_token: string } | null> {
  return new Promise(async (resolve, _reject) => {
    const baseURL = getApiURL(); // Retrieves the base URL from your utility function

    const url = `${baseURL}/v1/refresh`; // Constructs the full URL

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    // If there's an access token, add the Authorization header
    if (access_token) {
      headers.append("Authorization", `Bearer ${access_token}`);
    }

    try {
      const response = await fetch(url, {
        method: "GET", // Method is GET as we're trying to replicate .get from Axios
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json(); // Assuming the response is JSON

      // Use your data as needed
      resolve(data); // Example of accessing the access token from the response

      // Proceed with your logic here
    } catch (error) {
      console.error(
        "There was an error with the fetch /v1/refresh request:",
        error,
      );
      resolve(null);
    }
  });
}
