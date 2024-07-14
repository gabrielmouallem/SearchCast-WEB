export function getPosthogEnv() {
  return {
    HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  };
}
