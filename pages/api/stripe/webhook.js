// pages/api/stripe/webhook.js
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow','POST'); return res.status(405).end(); }

  const raw = Buffer.from(await req.arrayBuffer());
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook verify failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const sess = event.data.object;

        // PPV (mode=payment)
        if (sess.mode === 'payment') {
          const { post_id, buyer_id } = sess.metadata || {};
          if (post_id && buyer_id) {
            await supabase
              .from('post_unlocks')
              .upsert({ user_id: buyer_id, post_id: Number(post_id) },
                      { onConflict: 'user_id,post_id' });
          }
        }

        // SUBSCRIPTION (mode=subscription)
        if (sess.mode === 'subscription') {
          const { creator_id, fan_id } = sess.metadata || {};
          if (creator_id && fan_id && sess.subscription) {
            const sub = await stripe.subscriptions.retrieve(sess.subscription);
            await supabase.from('subscriptions').upsert({
              fan_id,
              creator_id,
              status: mapStripeStatus(sub.status),
              stripe_subscription_id: sub.id,
              current_period_end: new Date(sub.current_period_end * 1000).toISOString()
            }, { onConflict: 'stripe_subscription_id' });
          }
        }
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.created':
      case 'customer.subscription.deleted': {
        const s = event.data.object;
        // Wir brauchen creator_id/fan_id nicht zwingend; updaten nach stripe_subscription_id
        await supabase.from('subscriptions')
          .update({
            status: mapStripeStatus(s.status),
            current_period_end: new Date(s.current_period_end * 1000).toISOString()
          })
          .eq('stripe_subscription_id', s.id);
        break;
      }

      default:
        // ignore
        break;
    }

    res.status(200).json({ received: true });
  } catch (e) {
    console.error('Webhook handler failed:', e);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
}

function mapStripeStatus(st) {
  // Stripe -> unsere Statusbegriffe
  switch (st) {
    case 'active': return 'active';
    case 'trialing': return 'active';
    case 'past_due': return 'past_due';
    case 'canceled': return 'canceled';
    case 'incomplete': return 'incomplete';
    default: return 'incomplete';
  }
}
