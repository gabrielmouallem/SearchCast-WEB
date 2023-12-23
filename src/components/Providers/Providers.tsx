import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
