"use client";
import { Navbar, Footer } from "@/components";
import { PageContent } from "@/components/Content/PageContent";
import { useIdentifyUser } from "@/hooks";

export default function Home() {
  useIdentifyUser();

  return (
    <main className="px-8 pt-5 md:pt-16">
      <Navbar />
      <PageContent />
      <Footer />
    </main>
  );
}
