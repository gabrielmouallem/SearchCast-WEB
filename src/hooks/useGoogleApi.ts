import { gapi } from "gapi-script";
import React from "react";

export function useGoogleApi() {
  React.useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: "profile email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);
}
