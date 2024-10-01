import { useAuth } from "./useAuth";

export function useUser() {
  const { getUser } = useAuth();

  return getUser();
}
