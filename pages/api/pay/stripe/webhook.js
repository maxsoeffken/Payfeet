import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const config = {
  api: {
    bodyParser: false, // wichtig für Stripe Signaturprüfung
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const raw = Buffer.from(await req.arrayBuffer());
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('⚠️  Webhook signature verify failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const { post_id, user_id } = session.metadata || {};

        if (post_id && user_id) {
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
        }
        break;
      }

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
        break;
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('Webhook handler failed:', err);
    return res.status(500).json({ error: 'Webhook handler failed' });
  }
}
