import { Navbar, Footer } from "@/components";
import { PageContent } from "@/components/Content/PageContent";
import { getAndIdentifyUser } from "@/utils/server/getAndIdentifyUser";

export default async function Home() {
  await getAndIdentifyUser();

  return (
    <main className="pt-5 md:pt-16">
      <Navbar />
      <PageContent />
      <Footer />
    </main>
  );
}
