import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (!user) return [];

    return await ctx.db
      .query("stamps")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();
  },
});

export const create = mutation({
  args: {
    type: v.union(v.literal("note"), v.literal("mindmap"), v.literal("browser")),
    title: v.string(),
    content: v.any(),
    position: v.object({
      x: v.number(),
      y: v.number(),
      width: v.number(),
      height: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (!user) throw new Error("User not found");

    return await ctx.db.insert("stamps", {
      userId: user._id,
      type: args.type,
      title: args.title,
      content: args.content,
      position: args.position,
      lastModified: Date.now(),
    });
  },
});

export const updateStamp = mutation({
  // Use "updateStamp" to match your table's purpose
  args: { 
    id: v.id("stamps"), 
    content: v.any(), 
    title: v.string() 
  },
  handler: async (ctx, args) => {
    const { id, content, title } = args; // Destructure args here

    // Patch allows you to only update specific fields
    await ctx.db.patch(id, { 
      content: content, 
      title: title,
      lastModified: Date.now() // Good idea to track this for your "Recently Visited" list
    });

    // Optional: Return the updated document
    return await ctx.db.get(id);
  },
});

export const getById = query({
  args: { id: v.id("stamps") },
  handler: async (ctx, args) => {
    const stamp = await ctx.db.get(args.id);
    return stamp;
  },
});