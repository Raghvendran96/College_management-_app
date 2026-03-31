"use server"

import { askGemini } from "@/lib/gemini";

export async function askTutor(prompt: string, context?: string) {
  try {
    const response = await askGemini(prompt, context);
    return { success: true, response };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { success: false, error: "Failed to get AI response." };
  }
}
