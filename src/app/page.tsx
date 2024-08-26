import { Navbar, Footer } from "@/components";
import { PageContent } from "@/components/Content/PageContent";
import { Providers } from "@/components/Providers";
import { getAndIdentifyUser } from "@/utils/server/getAndIdentifyUser";

export default async function Home() {
  await getAndIdentifyUser();

  return (
    <Providers>
      <main className="pt-5 md:pt-16">
        <Navbar />
        <PageContent />
        <Footer />
      </main>
    </Providers>
  );
}
