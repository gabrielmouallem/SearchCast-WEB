import posthog from "posthog-js";
import { User } from "@/types";

export function identifyUser(user: User | undefined | null) {
  if (user) {
    posthog.identify(user._id, { ...user });
  }
}
