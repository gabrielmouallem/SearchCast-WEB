export enum Paths {
  ERROR = "/error",
  FORGOT_PASSWORD = "/forgot-password",
  AUTH_CALLBACK = "/auth/callback",
  GUIDE = "/guide",
  HOME = "/",
  LOGIN = "/login",
  PASSWORD_RESET = "/password-reset",
  PLANS = "/plans",
  PRIVACY_POLICY = "/privacy-policy",
  PROFILE = "/profile",
  REGISTER = "/register",
  SEARCH = "/search",
  JOIN_BETA = "/join-beta",
}

export enum ApiPaths {
  REGISTER = "/api/register",
  LOGIN = "/api/login",
  FORGOT_PASSWORD = "/api/forgot-password",
  PASSWORD_RESET = "/api/password-reset",
}

export const PUBLIC_PATHS: readonly Paths[] = [
  Paths.ERROR,
  Paths.FORGOT_PASSWORD,
  Paths.AUTH_CALLBACK,
  Paths.HOME,
  Paths.LOGIN,
  Paths.PASSWORD_RESET,
  Paths.REGISTER,
];

export const PROTECTED_PATHS = [
  Paths.SEARCH,
  Paths.PROFILE,
  Paths.PLANS,
  Paths.JOIN_BETA,
];

export const PUBLIC_API_PATHS: readonly ApiPaths[] = [
  ApiPaths.REGISTER,
  ApiPaths.LOGIN,
  ApiPaths.FORGOT_PASSWORD,
  ApiPaths.PASSWORD_RESET,
];
