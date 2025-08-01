import { inngest } from "@/lib/inngest/client";
import { generateIndustryInsights } from "@/lib/inngest/function";
import { serve } from "inngest/next";

// Create an API that serves functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [generateIndustryInsights],
});
