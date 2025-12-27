import {
  streamText,
  tool,
  UIMessage,
  convertToModelMessages,
  stepCountIs,
} from "ai";
import { anthropic, AnthropicProviderOptions } from "@ai-sdk/anthropic";
import { z } from "zod";
import { fetchQuery, fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ORCHESTRATOR_PROMPT } from "@/lib/prompts/orchestrator";
import { WRITER_PROMPT } from "@/lib/prompts/writer";

export async function POST(req: Request) {
  const { messages, sessionId }: { messages: UIMessage[]; sessionId: string } =
    await req.json();

  // Get session status from Convex to determine which agent to use
  const session = await fetchQuery(api.sessions.get, {
    sessionId: sessionId as Id<"sessions">,
  });
  const isWriterPhase =
    session?.status === "drafting" || session?.status === "refining";

  const result = streamText({
    model: anthropic("claude-sonnet-4-5-20250929"),
    system: isWriterPhase ? WRITER_PROMPT : ORCHESTRATOR_PROMPT,
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    toolChoice: "auto",
    providerOptions: {
      anthropic: {
        thinking: { type: "enabled", budgetTokens: 8000 },
      } satisfies AnthropicProviderOptions,
    },
    tools: isWriterPhase
      ? {}
      : {
          web_search: anthropic.tools.webSearch_20250305({
            maxUses: 5,
          }),
          transfer_to_writer: tool({
            description:
              "Hand off to Writer agent when ready to generate drafts",
            inputSchema: z.object({
              topic: z.string(),
              angle: z.string(),
              research_summary: z.string().optional(),
              content_type: z.enum(["tweet", "blog", "email", "essay"]),
            }),
            execute: async ({
              topic,
              angle,
              research_summary,
              content_type,
            }) => {
              // Update session status to trigger Writer on next request
              await fetchMutation(api.sessions.updateStatus, {
                sessionId: sessionId as Id<"sessions">,
                status: "drafting",
              });
              return { topic, angle, research_summary, content_type, handoff: true };
            },
          }),
        },
  });

  return result.toUIMessageStreamResponse();
}
