namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    NEXT_PUBLIC_APP_URL: string;
    NEXT_PUBLIC_API_URL: string;
    BING_API_KEY: string;
    BING_API_URL: string;
    NEXT_PUBLIC_AUTOSUGGEST_ENABLED: string;
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
    NEXT_PUBLIC_GOOGLE_REDIRECT_URI: string;
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
    NEXT_PUBLIC_POSTHOG_KEY: string;
    NEXT_PUBLIC_POSTHOG_HOST: string;
    NEXT_PUBLIC_GOOGLE_TAG_ID: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    SUPABASE_JWT_SECRET: string;
    NEXT_PUBLIC_SUPABASE_URL: string;
    RESEND_API_KEY: string;
    DEV: boolean;
    PROD: boolean;
  }
}
