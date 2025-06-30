import { getIndustryInsights } from "@/actions/dashboard";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";
import DashboardView from "./_components/dashboardView";

const IndustryInsights = async () => {
  const { isOnboarded } = await getUserOnboardingStatus();
  const insights = await getIndustryInsights();
  // If not onboarded, redirect to onboarding page
  if (!isOnboarded) {
    redirect("/onboarding");
  }
  return (
    <div className="container mx-auto">
      <DashboardView insights={insights} />
    </div>
  );
};

export default IndustryInsights;
