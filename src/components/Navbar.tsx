import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { ModeToggle } from "./mode-toggle";

function Navbar() {
  return (
    <header className="w-full h-12 flex items-center px-4">
      <nav className="w-full h-full flex items-center justify-between">
        <h1 className="italic underline text-3xl">Cognito</h1>
        <div className="flex gap-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
