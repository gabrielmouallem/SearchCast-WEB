import { Footer, Navbar } from "@/components";

export default function Login() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex justify-center items-center">
        {/* Content goes here */}
        <div>
          {/* Your centered content */}
          this content is centered on screen
        </div>
      </div>
      <Footer />
    </div>
  );
}
