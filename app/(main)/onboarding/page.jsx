import { getUserOnboardingStatus } from "@/actions/user";
import { industries } from "@/data/industries";
import { redirect } from "next/navigation";
import React from "react";
import OnboardingForm from "./_components/onboardingForm";

const OnboardindPage = async () => {
  // check if user is already onboarded
  const { isOnboarded } = await getUserOnboardingStatus();
  console.log("Status:", isOnboarded);

  if (isOnboarded) {
    redirect("/dashboard");
  }
  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  );
};

export default OnboardindPage;
