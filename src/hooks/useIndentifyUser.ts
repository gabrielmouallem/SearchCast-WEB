"use client";
import { useEffect } from "react";
import posthog from "posthog-js";
import { User } from "@/types";
import { useUser } from "./useUser";

export function useIdentifyUser() {
  const user = useUser();

  useEffect(() => {
    if (user) {
      posthog.identify(user.id, { ...user });
    }
  }, [user]);

  function identifyUser(user: User) {
    posthog.identify(user.id, { ...user });
  }

  return {
    identifyUser,
  };
}
