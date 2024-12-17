"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { Radio } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  return (
    <div className=" flex p-2 justify-between w-full">
      <div>
        <h1>
          <Button
            onClick={() => router.push("/live")}
            variant={"outline"}
            className="border-none"
          >
            Elect{" "}
            <Radio className="text-red-700 animate-pulse rounded-full w-12 h-12" />
          </Button>
        </h1>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-3">
          <Link href="/">Home</Link>
          <Link href="/admin">Dashboard</Link>
        </div>

        <SignedOut>
          <Button onClick={() => router.push("/sign-in")}>Admin</Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
          <ModeToggle />
        </SignedIn>
      </div>
    </div>
  );
}
