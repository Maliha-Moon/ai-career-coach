"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// define model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// propmt
export const generateAIInsights = async (industry) => {
  const propmt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "HIGH" | "MEDIUM" | "LOW",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `;

  // prompt the model
  const result = await model.generateContent(propmt);
  const response = result.response;
  // text response provided by Gemini API
  const text = response.text();
  // clean the response text
  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
  // convert to object & return
  return JSON.parse(cleanedText);
};

export async function getIndustryInsights() {
  // check authentication
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized"); // if not logged-in, throw error

  // ensures user exists in DB
  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!userId) throw new Error("User not found");

// if the industry doesn't exist, create it
  if (!user.industryInsight) {
    // find if insight exists in db
    let industryInsight = await db.industryInsight.findUnique({
      where: { industry: user.industry },
    });

    // if does not exist
    if (!industryInsight) {
      const insights = await generateAIInsights(user.industry);
      industryInsight = await db.industryInsight.create({
        data: {
          industry: user.industry,
          ...insights,
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });
    }
    return industryInsight;
  }
  // if already connected
  return user.industryInsight;
}

