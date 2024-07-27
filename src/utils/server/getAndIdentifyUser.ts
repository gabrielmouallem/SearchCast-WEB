import { getUser, identifyUser } from "@/utils/server";

export async function getAndIdentifyUser() {
  const user = await getUser();

  if (user) {
    identifyUser(user);
  }

  return user;
}
