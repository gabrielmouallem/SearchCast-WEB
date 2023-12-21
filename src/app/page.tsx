import { Navbar, Footer } from "@/components";
import { PageContent } from "@/components/Content/PageContent";

export default function Home() {
  return (
    <main className="pt-20">
      <Navbar />
      <PageContent />
      <Footer />
    </main>
  );
}
