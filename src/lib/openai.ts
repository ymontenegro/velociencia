import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const MODELS = {
  journalist: "gpt-4.1-mini",
  editor: "gpt-4.1",
} as const;
