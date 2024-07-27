import { Navbar } from "@/components";
import { GuideContent } from "./components/GuideContent";
import { getUser } from "@/utils/server";

export default async function Guide() {
  const user = await getUser();

  const isAuthenticated = !!user;

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <GuideContent />
    </>
  );
}
