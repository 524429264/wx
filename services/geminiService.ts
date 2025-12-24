
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export async function* streamChat(message: string) {
  if (!API_KEY) {
    yield "Error: API Key is missing. Please check your environment.";
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: "You are 'Gemini Assistant' in a WeChat-like H5 app. Be helpful, concise, and friendly. Use occasional emojis like 🚀, 😊, or ✨ to fit the mobile chat vibe.",
      },
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    yield "Sorry, I encountered an error. Please try again later.";
  }
}
