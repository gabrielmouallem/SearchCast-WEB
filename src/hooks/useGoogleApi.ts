import React from "react";

export function useGoogleApi() {
  React.useEffect(() => {
    async function start() {
      const { gapi } = await import("gapi-script");
      gapi.client.init({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        plugin_name: "SearchCast WEB App",
        scope: "profile email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);
}
