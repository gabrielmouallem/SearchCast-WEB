import { useCookies } from "@/hooks";
import { stringToBoolean } from "@/utils";

export function useSkipOnboarding() {
  const { getCookie } = useCookies("skip_onboarding", "false")

  const skipOnboarding = stringToBoolean(getCookie());

  return skipOnboarding;
}