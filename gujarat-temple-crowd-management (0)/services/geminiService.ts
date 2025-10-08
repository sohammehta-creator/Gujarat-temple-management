
import { GoogleGenAI } from "@google/genai";
import { TEMPLES_DATA } from '../constants';

// Initialize the Google Gemini AI client. The API key is sourced from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getChatbotResponse = async (message: string): Promise<string> => {
  const model = 'gemini-2.5-flash';

  // Providing context to the model is key for good responses.
  // We remove the 'icon' component before stringifying, as it's not serializable for the API call.
  const templeDataString = JSON.stringify(TEMPLES_DATA, (key, value) => {
    if (key === 'icon') {
      return undefined;
    }
    return value;
  }, 2);
  
  const systemInstruction = `You are a helpful assistant for the "Gujarat Darshan" app. Your goal is to provide information about temples in Gujarat.
Current live data for the temples is provided below in JSON format. Use this data to answer user questions about crowd status, wait times, parking, weather, etc.
Do not make up information; if the user asks for something not in the provided data, say that you don't have that information.
Keep your responses conversational, concise, and helpful. You can also answer general questions about temple history or booking procedures (Note: booking is a demo feature).

Current Temple Data:
${templeDataString}
`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: message,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error getting bot response from Gemini API:", error);
    // Provide a user-friendly error message for API failures.
    return "Sorry, I'm having trouble connecting right now. Please try again in a moment.";
  }
};
