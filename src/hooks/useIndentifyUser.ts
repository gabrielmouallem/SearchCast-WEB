"use client";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import posthog from "posthog-js";
import { User } from "@/types";

export function useIdentifyUser() {
  const { getUser } = useAuth();

  useEffect(() => {
    const user = getUser();
    if (user) {
      posthog.identify(user._id, { ...user });
    }
  }, [getUser]);

  function identifyUser(user: User) {
    posthog.identify(user._id, { ...user });
  }

  return {
    identifyUser,
  };
}
