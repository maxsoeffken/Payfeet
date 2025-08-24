// pages/api/stripe/webhook.js
// Wichtig: bodyParser AUS, damit wir die rohe Signatur prüfen können
export const config = { api: { bodyParser: false } };

import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Stripe & Supabase (Server) initialisieren
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  // Service-Role-Key, weil wir serverseitig schreiben
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Roh-Body einlesen (ohne bodyParser)
async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  let event;
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    const rawBody = await readRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("❌  Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        // Werte, die wir beim Erstellen der Checkout-Session in metadata mitgegeben haben
        const buyerId   = session?.metadata?.buyer_id;   // der Käufer (auth.uid)
        const postId    = session?.metadata?.post_id;    // welches Post wurde gekauft (PPV)
        const creatorId = session?.metadata?.creator_id; // optional: wem gehört der Post

        // Fallback-Logging, wenn etwas fehlt
        if (!buyerId || !postId) {
          console.warn("checkout.session.completed ohne buyerId/postId", {
            buyerId,
            postId,
          });
          break;
        }

        // 1) Zugriff auf das Medium freischalten
        // Tabelle: media_access (user_id, post_id, created_at)
        const { error: accessErr } = await supabase
          .from("media_access")
          .insert([{ user_id: buyerId, post_id: postId }]);

        if (accessErr) {
          console.error("Fehler beim Eintragen in media_access:", accessErr);
          // kein throw -> Stripe versucht sonst erneut zu senden; wir loggen nur
        }

        // 2) (optional) Kauf für Historie protokollieren
        // Wenn du eine purchases/käufe-Tabelle hast, kannst du sie hier befüllen:
        // await supabase.from("purchases").insert([{
        //   user_id: buyerId,
        //   post_id: postId,
        //   creator_id: creatorId || null,
        //   amount_total: session.amount_total, // in Cent
        //   currency: session.currency
        // }]);

        break;
      }

      default:
        // Für Debug-Zwecke
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Stripe erwartet ein 200, sonst wird der Event erneut gesendet
    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("❌ Fehler in Webhook-Handler:", err);
    return res.status(500).send("Server error");
  }
}
