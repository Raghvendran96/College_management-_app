import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function askGemini(prompt: string, context?: string) {
  const result = await model.generateContent([
    context ? `Context: ${context}\n\nQuestion: ${prompt}` : prompt,
  ]);
  return result.response.text();
}
