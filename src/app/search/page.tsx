import { Footer, Navbar } from "@/components";
import { SearchEngine } from "@/components";
import { Providers } from "@/components/Providers";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import { LoadingFallback } from "@/components/LoadingFallback";

async function SearchContent() {
  return (
    <Providers>
      <ToastContainer />
      <div className="min-w-screen -mt-28 flex min-h-screen flex-col !bg-default-gradient">
        <Navbar isAuthenticated />
        <SearchEngine />
        <Footer />
      </div>
    </Providers>
  );
}

export default function Search() {
  return (
    <Suspense
      fallback={
        <div className="-mt-[20vh] flex min-h-screen">
          <LoadingFallback />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
