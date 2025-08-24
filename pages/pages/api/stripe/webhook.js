// pages/api/stripe/webhook.js
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// --- wichtig: rohen Body erlauben, damit Stripe-Signatur geprüft werden kann
export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Hilfsfunktion: rohen Body als Buffer lesen
function readBuffer(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const sig = req.headers["stripe-signature"];
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    const buf = await readBuffer(req);
    event = stripe.webhooks.constructEvent(buf, sig, secret);
  } catch (err) {
    console.error("⚠️  Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const postId = parseInt(session?.metadata?.postId, 10);
      const userId = session?.metadata?.userId || null;
      const creatorId = session?.metadata?.creatorId || null;

      if (postId && userId) {
        const { error } = await supabaseAdmin
          .from("purchases")
          .upsert(
            {
              user_id: userId,
              creator_id: creatorId,
              post_id: postId,
              amount: session.amount_total ?? 299, // in Cent
              currency: session.currency ?? "eur",
              stripe_session_id: session.id,
              status: "succeeded",
            },
            { onConflict: "stripe_session_id" }
          );

        if (error) console.error("Supabase insert error:", error);
      }
    }

    // Optional: weitere Events später hier behandeln (payment_intent.* etc.)
    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return res.status(500).json({ ok: false });
  }
}
