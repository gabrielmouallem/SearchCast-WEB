import { useCookies } from "@/hooks";
import { stringToBoolean } from "@/utils";

export function useSkipOnboarding() {
  const { getCookie, updateCookie } = useCookies("skip_onboarding", "false");

  const skipOnboarding = stringToBoolean(getCookie());

  function finishOnboarding() {
    updateCookie("true", 30);
  }

  return { skipOnboarding, finishOnboarding };
}
