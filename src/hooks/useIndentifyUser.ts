"use client";
import { useEffect } from "react";
import posthog from "posthog-js";
import { User } from "@/types";
import { useUser } from "./useUser";

export function useIdentifyUser() {
  const user = useUser();

  useEffect(() => {
    if (user) {
      identifyUser(user);
    }
  }, [user]);

  function identifyUser(user: User) {
    const id = user?.id ?? user?.session_id;
    posthog.identify(id, {
      email: user?.email,
      name: user?.user_metadata?.full_name,
      metadata: user,
    });
  }

  return {
    identifyUser,
  };
}
