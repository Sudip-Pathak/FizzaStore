import { GoogleGenerativeAI } from "@google/generative-ai";
import Demand from "../models/demand.model.js";

const SYSTEM_INSTRUCTION = `You are a helpful customer support and sales assistant for the Fizza Shopping Store.
You speak both English and Nepali fluidly. Answer in the language the user speaks.
Your job is to:
1. Help users understand how to use the website (e.g., adding to cart, checkout, tracking orders).
2. Tell them about our latest products if they ask.
3. If they ask for a product we don't have, politely tell them you will forward their demand to the admin.

IMPORTANT RULE:
If the user demands or requests a specific product, you must include the EXACT phrase "[DEMAND: <product_name>]" anywhere in your response. For example: "I will let the admin know you want a [DEMAND: PlayStation 5]."
This phrase will be intercepted by our system and the product will be added to the demand list.
`;

export const handleChat = async (req, res) => {
  try {
    const { history, message, userId } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Gemini API key is missing. Admin needs to set GEMINI_API_KEY." });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", systemInstruction: SYSTEM_INSTRUCTION });
    
    // Formatting history for Gemini API
    let formattedHistory = (history || []).map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }]
    }));

    // Gemini API requires the history to start with a 'user' message
    if (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
      formattedHistory.shift();
    }

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessage(message);
    let responseText = result.response.text();

    // Intercept DEMAND tag
    const demandMatch = responseText.match(/\[DEMAND:\s*(.+?)\]/i);
    if (demandMatch && demandMatch[1]) {
      const productName = demandMatch[1].replace(/]/g, "").trim();
      // Log it to db
      await Demand.create({ productName, user: userId || null });
      // Remove the exact tag from the text sent to user to make it look natural
      responseText = responseText.replace(/\[DEMAND:\s*(.+?)\]/gi, productName);
    }

    res.json({ response: responseText });
  } catch (error) {
    console.error("Chat API Error:", error);
    res.status(500).json({ error: "Failed to process chat" });
  }
};

import Groq from "groq-sdk";

export const handleGroqChat = async (req, res) => {
  try {
    const { history, message, userId } = req.body;

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: "Groq API key is missing. Admin needs to set GROQ_API_KEY." });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // Formatting history for Groq API (OpenAI format)
    const messages = [
      { role: "system", content: SYSTEM_INSTRUCTION },
      ...(history || []).map(h => ({
        role: h.role === 'model' ? 'assistant' : 'user',
        content: h.text
      })),
      { role: "user", content: message }
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: "llama-3.1-8b-instant",
    });

    let responseText = chatCompletion.choices[0]?.message?.content || "";

    // Intercept DEMAND tag
    const demandMatch = responseText.match(/\[DEMAND:\s*(.+?)\]/i);
    if (demandMatch && demandMatch[1]) {
      const productName = demandMatch[1].replace(/]/g, "").trim();
      // Log it to db
      await Demand.create({ productName, user: userId || null });
      // Remove the exact tag from the text sent to user to make it look natural
      responseText = responseText.replace(/\[DEMAND:\s*(.+?)\]/gi, productName);
    }

    res.json({ response: responseText });
  } catch (error) {
    console.error("Groq Chat API Error:", error);
    res.status(500).json({ error: "Failed to process chat with Groq" });
  }
};
