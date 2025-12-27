import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("drafts")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();
  },
});

export const get = query({
  args: { draftId: v.id("drafts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.draftId);
  },
});

export const create = mutation({
  args: {
    sessionId: v.id("sessions"),
    title: v.string(),
    content: v.string(),
    strategy: v.string(),
  },
  handler: async (ctx, args) => {
    const wordCount = args.content.split(/\s+/).filter(Boolean).length;
    
    const draftId = await ctx.db.insert("drafts", {
      sessionId: args.sessionId,
      title: args.title,
      content: args.content,
      strategy: args.strategy,
      wordCount,
      version: 1,
      isSelected: false,
    });
    return draftId;
  },
});

export const update = mutation({
  args: {
    draftId: v.id("drafts"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const draft = await ctx.db.get(args.draftId);
    if (!draft) throw new Error("Draft not found");
    
    const wordCount = args.content.split(/\s+/).filter(Boolean).length;
    
    await ctx.db.patch(args.draftId, {
      content: args.content,
      wordCount,
      version: draft.version + 1,
    });
  },
});

export const select = mutation({
  args: {
    draftId: v.id("drafts"),
    sessionId: v.id("sessions"),
  },
  handler: async (ctx, args) => {
    // Deselect all drafts in session
    const drafts = await ctx.db
      .query("drafts")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();
    
    for (const draft of drafts) {
      await ctx.db.patch(draft._id, { isSelected: false });
    }
    
    // Select the target draft
    await ctx.db.patch(args.draftId, { isSelected: true });
  },
});
