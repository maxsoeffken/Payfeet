// pages/api/subscribe/create-session.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

export default async function handler(req,res){
  if (req.method!=='POST') { res.setHeader('Allow','POST'); return res.status(405).end(); }

  try {
    const { creatorId, creatorUsername, fanId, priceCents } = req.body || {};
    if (!creatorId || !fanId || !priceCents) {
      return res.status(400).json({ error: 'creatorId, fanId, priceCents erforderlich' });
    }

    const origin = req.headers.origin || `https://${req.headers.host || 'payfeet.vercel.app'}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: { name: `Abo @${creatorUsername || 'creator'}` },
          unit_amount: priceCents,
          recurring: { interval: 'month' }
        },
        quantity: 1
      }],
      metadata: {
        creator_id: String(creatorId),
        fan_id: String(fanId)
      },
      success_url: `${origin}/u/${encodeURIComponent(creatorUsername) }?sub=success`,
      cancel_url: `${origin}/u/${encodeURIComponent(creatorUsername) }?sub=cancel`
    });

    res.status(200).json({ url: session.url });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Checkout fehlgeschlagen' });
  }
}
