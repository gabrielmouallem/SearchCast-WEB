import { Navbar } from "@/components";
import { GuideContent } from "./components/GuideContent";
import { getUser } from "@/utils/server";
import { Providers } from "@/components/Providers";

export default async function Guide() {
  const user = await getUser();

  const isAuthenticated = !!user;

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <Providers>
        <GuideContent />
      </Providers>
    </>
  );
}
