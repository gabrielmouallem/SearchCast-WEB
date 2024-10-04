import { Navbar, Footer } from "@/components";
import { PageContent } from "@/components/Content/PageContent";
import { Providers } from "@/components/Providers";

export default async function Home() {
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
