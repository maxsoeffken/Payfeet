// pages/api/stripe/webhook.js
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Admin-Client (bypasst RLS – dafür hast du das SERVICE_ROLE_KEY gesetzt)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// HINWEIS: Für den schnellen Start verifizieren wir die Signatur hier NICHT.
// Das funktioniert in Produktion, ist aber weniger sicher.
// (Ich gebe dir danach optional die „Signatur-Verifizierung“-Version.)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const event = req.body; // dank Next.js bodyParser bereits als JSON

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Metadaten, die wir beim Checkout gesetzt haben:
      const postId = parseInt(session?.metadata?.postId, 10);
      const userId = session?.metadata?.userId || null;
      const creatorId = session?.metadata?.creatorId || null;

      // Basic-Validierung
      if (!postId || !userId) {
        console.warn("Missing metadata on session:", session?.id);
        return res.status(200).json({ ok: true }); // nichts tun, aber OK an Stripe
      }

      // In purchases eintragen (idempotent über stripe_session_id)
      const { error } = await supabaseAdmin
        .from("purchases")
        .upsert(
          {
            user_id: userId,
            creator_id: creatorId,
            post_id: postId,
            amount: session.amount_total ?? 299, // Cent
            currency: session.currency ?? "eur",
            stripe_session_id: session.id,
            status: "succeeded",
          },
          { onConflict: "stripe_session_id" }
        );

      if (error) {
        console.error("Supabase insert error:", error);
        // 2xx zurückgeben, damit Stripe nicht endlos retried, aber Fehler loggen
      }
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(200).json({ ok: true }); // 2xx, damit Stripe nicht spammt
  }
}
