import { Providers } from "@/components/Providers";
import { Plans } from "./components/Plans";
import { getAndIdentifyUser } from "@/utils/server/getAndIdentifyUser";

export default async function PlansPage() {
  await getAndIdentifyUser(); // important to idenfity the user right after the login when the user has no active plans and will be redirected to plans page

  return (
    <Providers>
      <Plans />
    </Providers>
  );
}
