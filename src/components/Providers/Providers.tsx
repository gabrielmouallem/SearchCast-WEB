"use client";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const queryClient = new QueryClient();

const createPersister = () => {
  if (typeof window !== "undefined") {
    return createSyncStoragePersister({
      storage: window.localStorage,
    });
  }
  return null;
};

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const persister = createPersister();

  if (!persister) {
    // Optionally, you can render a fallback UI or simply the children without persistence
    return <>{children}</>;
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
