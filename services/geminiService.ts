
import { GoogleGenAI } from "@google/genai";
import { TranslationRequest } from "../types";

export const translateText = async (req: TranslationRequest): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `Translate the following text from ${req.sourceLang} to ${req.targetLang}. 
Return ONLY the translated text without explanation:
${req.text}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.1, // Keep it precise for translation
      }
    });

    if (!response.text) {
      throw new Error("Empty response from AI");
    }

    return response.text.trim();
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
};
