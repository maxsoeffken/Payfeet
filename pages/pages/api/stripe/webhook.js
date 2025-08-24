// pages/api/stripe/webhook.js
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const config = {
  api: {
    // WICHTIG: Roh-Body für Stripe-Signaturprüfung
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // nur hier (Server) benutzen
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  // Rohdaten holen (ohne zusätzliche Libraries)
  const raw = Buffer.from(await req.arrayBuffer());
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      raw,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('⚠️  Webhook signature verify failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      // Wenn Checkout erfolgreich war
      case 'checkout.session.completed': {
        const session = event.data.object;

        // Wir erwarten, dass du diese Werte beim Erstellen der Session gesetzt hast
        // (z.B. in /api/pay/ppv): metadata: { post_id, user_id, creator_id }
        const { post_id, user_id, creator_id } = session.metadata || {};

        if (post_id && user_id) {
          // Freischaltung für den Käufer speichern (idempotent)
          await supabase
            .from('post_unlocks')
            .upsert(
              {
                user_id,
                post_id: Number(post_id),
                created_at: new Date().toISOString(),
              },
              { onConflict: 'user_id,post_id' }
            );

          // Optional: Verkäufe zählen (falls du eine Funktion angelegt hast)
          // await supabase.rpc('increment_post_sales', { p_post_id: Number(post_id) }).catch(() => {});
        }

        break;
      }

      // Optional: bei Rückerstattung Freischaltung entfernen
      case 'charge.refunded': {
        const { metadata } = event.data.object || {};
        const { post_id, user_id } = metadata || {};
        if (post_id && user_id) {
          await supabase
            .from('post_unlocks')
            .delete()
            .eq('user_id', user_id)
            .eq('post_id', Number(post_id));
        }
        break;
      }

      default:
        // andere Events ignorieren
        break;
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('Webhook handler failed:', err);
    return res.status(500).json({ error: 'Webhook handler failed' });
  }
}
