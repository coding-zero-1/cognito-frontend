import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@clerk/clerk-react";
import { Brain } from "lucide-react";

function LandingPage() {
  const { isLoaded } = useAuth();
  if (!isLoaded) {
    return (
      <div className="w-full h-[calc(100vh-12rem)] flex justify-center items-center">
        <Spinner className="size-8" />
      </div>
    );
  }
  return (
    <main className="w-full h-[calc(100vh-3rem)] lg:px-4 md:px-2 pt-2 flex flex-col justify-between items-center">
      <h1 className="md:text-5xl text-4xl flex flex-col md:flex-row items-center justify-center gap-3 mt-5">Your very own<span className="text-[#2B20FF] flex items-center italic underline dark:text-cyan-400">Second Brain <Brain className="inline size-11"/> </span></h1>
      <img src="/hero-section-image-2.png" alt="" className="h-[80%] md:w-[80%] w-full object-fill rounded-2xl" />
    </main>
  );
}

export default LandingPage;