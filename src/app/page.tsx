import { Navbar, Footer } from "@/components";
import { PageContent } from "@/components/Content/PageContent";
import { getAndIdentifyUser } from "@/utils/server/getAndIdentifyUser";

export default function Home() {
  getAndIdentifyUser();

  return (
    <main className="px-8 pt-5 md:pt-16">
      <Navbar />
      <PageContent />
      <Footer />
    </main>
  );
}
