import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";
import { ModeToggle } from "./mode-toggle";
import { Spinner } from "./ui/spinner";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function Navbar() {
  const { isLoaded } = useAuth();
  return (
    <header className="w-full h-12 flex items-center px-4">
      <nav className="w-full h-full flex items-center justify-between">
        <h1 className="italic underline text-3xl">
          <Link to="/">Cognito</Link>
        </h1>
        <div className="flex gap-4 items-center">
          {isLoaded ? (
            <>
              <SignedOut>
                <SignInButton>
                  <Button variant="default">Sign In</Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </>
          ) : (
            <Spinner />
          )}
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;