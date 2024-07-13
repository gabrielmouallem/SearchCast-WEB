import { Navbar, Footer } from "@/components";
import { PageContent } from "@/components/Content/PageContent";

export default function Home() {
  return (
    <main className="px-8 pt-16 md:pt-20">
      <Navbar />
      <PageContent />
      <Footer />
    </main>
  );
}
