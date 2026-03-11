import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { Webhook } from "svix";

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("CLERK_WEBHOOK_SECRET environment variable is not set");
    }

    const svix_id = request.headers.get("svix-id");
    const svix_timestamp = request.headers.get("svix-timestamp");
    const svix_signature = request.headers.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Missing svix headers", { status: 400 });
    }

    const payload = await request.text();
    const wh = new Webhook(webhookSecret);

    let event: {
      type: string;
      data: {
        id: string;
        first_name?: string | null;
        last_name?: string | null;
        image_url?: string;
        email_addresses?: Array<{ email_address: string; id: string }>;
        primary_email_address_id?: string;
      };
    };

    try {
      event = wh.verify(payload, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as typeof event;
    } catch {
      return new Response("Invalid webhook signature", { status: 400 });
    }

    const { type, data } = event;

    if (type === "user.created" || type === "user.updated") {
      const primaryEmail = data.email_addresses?.find(
        (e) => e.id === data.primary_email_address_id
      )?.email_address ?? "";

      const name = [data.first_name, data.last_name].filter(Boolean).join(" ") || "Unknown";

      const domain = process.env.CLERK_FRONTEND_API_URL;
      await ctx.runMutation(internal.users.createOrUpdateUser, {
        tokenIdentifier: `${domain}|${data.id}`,
        name,
        email: primaryEmail,
        imageUrl: data.image_url,
      });
    } else if (type === "user.deleted") {
      await ctx.runMutation(internal.users.deleteUser, {
        tokenIdentifier: data.id,
      });
    }

    return new Response(null, { status: 200 });
  }),
});

export default http;
