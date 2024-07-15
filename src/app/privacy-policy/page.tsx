import { Navbar } from "@/components";
import "tailwindcss/tailwind.css";
import { PrivacyPolicyContent } from "./components/PrivacyPolicyContent";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <PrivacyPolicyContent />
    </>
  );
}
