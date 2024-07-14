"use client";
import { Navbar, Footer } from "@/components";
import { PageContent } from "@/components/Content/PageContent";
import { useIdentifyUser } from "@/hooks";

export default function Home() {
  useIdentifyUser();

  return (
    <main className="px-8 pt-16 md:pt-20">
      <Navbar />
      <PageContent />
      <Footer />
    </main>
  );
}
