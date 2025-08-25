// pages/api/pay/ppv.js
import Stripe from "stripe";
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });

// Service-Role NUR serverseitig!
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const { postId, userId, creatorId } = req.body || {};
    if (!postId || !userId) {
      return res.status(400).json({ error: "postId und userId sind erforderlich" });
    }

    // Preis & Sichtbarkeit sicher aus der DB lesen
    const { data: post, error } = await supabaseAdmin
      .from('posts')
      .select('price_cents, visibility')
      .eq('id', postId)
      .maybeSingle();

    if (error || !post) return res.status(404).json({ error: "Post nicht gefunden" });
    if (post.visibility !== 'ppv') return res.status(400).json({ error: "Post ist kein PPV" });

    const amount = post.price_cents && post.price_cents >= 100 ? post.price_cents : 299; // Fallback 2,99 €

    const origin = req.headers.origin || `https://${req.headers.host || "payfeet.vercel.app"}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: "Post freischalten", description: `Zugriff auf Post #${postId}` },
            unit_amount: amount
          },
          quantity: 1
        }
      ],
      metadata: {
        post_id: String(postId),
        buyer_id: String(userId),
        creator_id: creatorId ? String(creatorId) : ""
      },
      success_url: `${origin}/feed?purchase=success&post=${postId}`,
      cancel_url: `${origin}/feed?purchase=cancel&post=${postId}`
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe Checkout Fehler:", err);
    return res.status(500).json({ error: "Checkout konnte nicht erstellt werden" });
  }
}
