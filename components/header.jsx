import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { LayoutDashboard } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      {/* ⚠️backdrop-blur-md -> anything behind header will have blury effect */}
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* contain all navigation items of app */}
        <Link href="/">
          {/* navigate different pages/routes */}
          <Image
            src="/logo.jpg"
            alt="SkillSyncAi logo"
            width={200}
            height={60}
            className="h-15 py-1 w-auto object-contain"
          />
        </Link>

        <div>
          {/* dashboard / drop down menu */}
          {/* visible only if a user in signed in */}
          <SignedIn>
            <Link href={"/dashboard"}>
              <Button>
                <LayoutDashboard className="h-4 w-4" />
                Industry Insights
              </Button>
            </Link>
          </SignedIn>
        </div>
      </nav>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};

export default Header;
