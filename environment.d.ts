namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_BING_API_KEY: string;
    NEXT_PUBLIC_BING_API_URL: string;
    NEXT_PUBLIC_JWT_SECRET_KEY: string;
    NEXT_PUBLIC_AUTOSUGGEST_ENABLED: string;
    DEV: boolean;
    PROD: boolean;
  }
}
