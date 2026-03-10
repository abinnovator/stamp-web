import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const createOrUpdateUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", args.tokenIdentifier))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        name: args.name,
        email: args.email,
        imageUrl: args.imageUrl,
      });
    } else {
      await ctx.db.insert("users", {
        tokenIdentifier: args.tokenIdentifier,
        name: args.name,
        email: args.email,
        imageUrl: args.imageUrl,
      });
    }
  },
});

export const deleteUser = internalMutation({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, { tokenIdentifier }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", tokenIdentifier))
      .unique();

    if (user) {
      await ctx.db.delete(user._id);
    }
  },
});
