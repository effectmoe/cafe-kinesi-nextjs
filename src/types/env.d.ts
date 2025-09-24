declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SANITY_PROJECT_ID: string;
    NEXT_PUBLIC_SANITY_DATASET: string;
    NEXT_PUBLIC_SANITY_API_VERSION: string;
    NEXT_PUBLIC_SANITY_USE_CDN: string;
    SANITY_API_TOKEN: string;
    NEXT_PUBLIC_SITE_URL: string;
    NEXT_PUBLIC_SITE_NAME: string;
    NEXT_PUBLIC_GA_ID?: string;
    NEXT_PUBLIC_GA_MEASUREMENT_ID?: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}