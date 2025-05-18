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
import {
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  PenBox,
  StarsIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CheckUser } from "@/lib/checkUser";

export default async function Header() {
  await CheckUser();

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      {/* ⚠️backdrop-blur-md -> anything behind header will have blury effect */}

      {/* contain all navigation items of app */}
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* navigate different pages/routes */}
        <Link href="/">
          <Image
            src="/logo.jpg"
            alt="SkillSyncAi logo"
            width={200}
            height={60}
            className="h-15 py-1 w-auto object-contain"
            priority
          />
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">
          {/* visible only if a user in signed in */}
          <SignedIn>
            <Link href={"/dashboard"}>
              <Button variant="outline">
                {/* variant="outline" -> transparent background and a colored border */}
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:block"> Industry Insights </span>
              </Button>
            </Link>

            {/* dashboard / drop down menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2">
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block"> Growth Tools </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/resume" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span> Resume Buider </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/ai-cover-letter"
                    className="flex items-center gap-2"
                  >
                    <PenBox className="h-4 w-4" />
                    <span> Cover Letter </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/interview-prep"
                    className="flex items-center gap-2"
                  >
                    <GraduationCap className="h-4 w-4" />
                    <span> Interview Prep </span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="outline"> Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              // afterSignOutUrl="/"
              // signOutOptions={{
              //   callbackUrl: "/", // Alternative if you need more control
              // }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
