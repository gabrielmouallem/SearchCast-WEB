import { useQuery } from "@tanstack/react-query";
import { getActiveSubscription } from "../actions/getActiveSubscription";
import { useUser } from "@/hooks";

export function useGetActiveSubscription() {
  const user = useUser();
  return useQuery({
    queryKey: ["activeSubscription", user?.email],
    queryFn: () => getActiveSubscription(user?.email!),
  });
}
