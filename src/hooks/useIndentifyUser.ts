"use client";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import posthog from "posthog-js";

export function useIdentifyUser() {
  const { getUser } = useAuth();

  useEffect(() => {
    const user = getUser();
    if (user) {
      posthog.identify(user._id, { ...user });
    }
  }, [getUser]);
}
