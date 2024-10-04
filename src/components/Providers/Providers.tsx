"use client";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { getPosthogEnv } from "@/utils/shared";
import { useIdentifyUser } from "@/hooks";

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

  // Prevent caching of erroneous or empty data queries.
  // This ensures that retries can be performed to retrieve the correct data without being affected by previous errors.
  const shouldDehydrateQuery = ({ state }: Query) => {
    return !!state?.data;
  };

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        dehydrateOptions: {
          shouldDehydrateQuery,
        },
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useIdentifyUser();
  return (
    <CSPostHogProvider>
      <QueryProvider>{children}</QueryProvider>
    </CSPostHogProvider>
  );
}
