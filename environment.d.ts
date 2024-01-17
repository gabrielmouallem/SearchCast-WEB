namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_BING_API_KEY: string;
    NEXT_PUBLIC_BING_API_URL: string;
    NEXT_PUBLIC_JWT_SECRET_KEY: string;
    NEXT_PUBLIC_AUTOSUGGEST_ENABLED: string;
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
    NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: string;
    NEXT_PUBLIC_GOOGLE_API_KEY: string;
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
    DEV: boolean;
    PROD: boolean;
  }
}
