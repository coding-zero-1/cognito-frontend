import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@clerk/clerk-react";

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
    <main className="w-full h-[calc(100vh-3rem)] px-4 py-2">
      <div>LandingPage</div>
    </main>
  );
}

export default LandingPage;