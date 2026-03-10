import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users: Bridging Clerk and Convex
  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(), // This is the Clerk 'sub' ID
    imageUrl: v.optional(v.string()),
  }).index("by_token", ["tokenIdentifier"]),

  // Stamps: The "Unified Canvas" objects (Notes, Mindmaps, Windows)
  stamps: defineTable({
    userId: v.id("users"),
    type: v.union(v.literal("note"), v.literal("mindmap"), v.literal("browser")),
    title: v.string(),
    content: v.any(), // Store JSON from TipTap or ReactFlow here
    position: v.object({
      x: v.number(),
      y: v.number(),
      width: v.number(),
      height: v.number(),
    }),
    lastModified: v.number(),
  }).index("by_user", ["userId"]),

  // Calendars: The Timetable system
  calendars: defineTable({
    userId: v.id("users"),
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(), // Store as Unix timestamp
    endTime: v.number(),
    color: v.optional(v.string()), // For the UI aesthetic
    dayOfWeek: v.optional(v.number()), // 0-6 for recurring classes
  }).index("by_user", ["userId"]),
});