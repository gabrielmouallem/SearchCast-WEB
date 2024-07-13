"use client";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
  return <QueryProvider>{children}</QueryProvider>;
}
