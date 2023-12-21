import { Navbar, Footer } from "@/components";
import { PageContent } from "@/components/Content/PageContent";

export default function Home() {
  return (
    <main className="md:pt-20 pt-16">
      <Navbar />
      <PageContent />
      <Footer />
    </main>
  );
}
