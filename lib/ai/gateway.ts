import { createAnthropic } from "@ai-sdk/anthropic";

export const anthropic = createAnthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY!,
  baseURL: "https://gateway.ai.vercel.com/v1/anthropic",
});

export const MODEL_ID = "claude-opus-4-5-20250514";

export function getModel() {
  return anthropic(MODEL_ID);
}
