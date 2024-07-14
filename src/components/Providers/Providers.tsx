"use client";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { getPosthogEnv } from "@/utils";

const queryClient = new QueryClient();

const createPersister = () => {
  if (typeof window !== "undefined") {
    return createSyncStoragePersister({
      storage: window.localStorage,
    });
  }
  return null;
};

if (typeof window !== "undefined") {
  const POSTHOG_ENV = getPosthogEnv();
  posthog.init(POSTHOG_ENV.KEY, {
    api_host: POSTHOG_ENV.HOST,
    person_profiles: "always", // or 'always' to create profiles for anonymous users as well
  });
}

interface CSPostHogProviderProps {
  children: React.ReactNode;
}

export function CSPostHogProvider({ children }: CSPostHogProviderProps) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

const QueryProvider = ({ children }: ProvidersProps) => {
  const persister = createPersister();

  if (!persister) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <CSPostHogProvider>
      <QueryProvider>{children}</QueryProvider>
    </CSPostHogProvider>
  );
}
