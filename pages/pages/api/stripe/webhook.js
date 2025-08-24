import { buffer } from "micro";
import Stripe from "stripe";
import { supabase } from "../../../lib/supabaseClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

// Deaktiviere das automatische Body Parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("❌ Webhook Error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Reagiere auf Event-Typen
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Beispiel: Kauf in Supabase speichern
      await supabase.from("purchases").insert([
        {
          user_id: session.client_reference_id,
          amount: session.amount_total / 100,
          stripe_session_id: session.id,
        },
      ]);
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
