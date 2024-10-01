export enum Paths {
  ERROR = "/error",
  FORGOT_PASSWORD = "/forgot-password",
  AUTH_CALLBACK = "/auth/callback",
  GUIDE = "/guide",
  HOME = "/",
  LOGIN = "/login",
  Onboarding = "/onboarding",
  PASSWORD_RESET = "/password-reset",
  PLANS = "/plans",
  PRIVACY_POLICY = "/privacy-policy",
  PROFILE = "/profile",
  REGISTER = "/register",
  SEARCH = "/search",
}

export const PUBLIC_PATHS: readonly Paths[] = [
  Paths.ERROR,
  Paths.FORGOT_PASSWORD,
  Paths.AUTH_CALLBACK,
  Paths.GUIDE,
  Paths.HOME,
  Paths.LOGIN,
  Paths.PASSWORD_RESET,
  Paths.PRIVACY_POLICY,
  Paths.REGISTER,
];
