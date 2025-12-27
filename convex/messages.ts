import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();
  },
});

export const send = mutation({
  args: {
    sessionId: v.id("sessions"),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    agent: v.optional(
      v.union(v.literal("orchestrator"), v.literal("writer"))
    ),
    reasoning: v.optional(v.string()),
    toolCalls: v.optional(v.array(v.object({
      toolName: v.string(),
      toolCallId: v.string(),
    }))),
  },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("messages", {
      sessionId: args.sessionId,
      role: args.role,
      content: args.content,
      agent: args.agent,
      reasoning: args.reasoning,
      toolCalls: args.toolCalls,
    });
    return messageId;
  },
});

export const updateContent = mutation({
  args: {
    messageId: v.id("messages"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.messageId, { content: args.content });
  },
});
