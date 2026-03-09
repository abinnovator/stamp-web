import { createGroq } from "@ai-sdk/groq";
import { convertToModelMessages, streamText, UIMessage } from "ai";

export const maxDuration = 30;

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    system:
      "You are Stamp AI, a helpful study assistant. Help students with their questions, explain concepts clearly, and support their learning journey.",
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
