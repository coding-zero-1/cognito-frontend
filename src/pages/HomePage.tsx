import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@clerk/clerk-react";
import { Plus, Share } from "lucide-react";

function HomePage() {
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
      <div className="h-[7%] w-full flex items-center justify-end gap-4">
        <Button variant={"outline"}>
          <Share /> Share Brain
        </Button>
        <Button variant={"default"}>
          <Plus /> Add Card
        </Button>
      </div>
      <div className="w-full min-h-[93%] px-4 py-2">
      </div>
    </main>
  );
}

export default HomePage;