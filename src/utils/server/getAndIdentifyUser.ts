import { getUser, identifyUser } from "@/utils/server";

export function getAndIdentifyUser() {
  const user = getUser();

  if (user) {
    identifyUser(user);
  }

  return user;
}
