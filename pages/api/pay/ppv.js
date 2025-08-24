import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

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

    const amount = 299; // 2,99 € in Cent
    const origin =
      req.headers.origin || `https://${req.headers.host || "payfeet.vercel.app"}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Post freischalten",
              description: `Zugriff auf Post #${postId}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        post_id: String(postId),
        buyer_id: String(userId),
        creator_id: creatorId ? String(creatorId) : "",
      },
      success_url: `${origin}/feed?purchase=success&post=${postId}`,
      cancel_url: `${origin}/feed?purchase=cancel&post=${postId}`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe Checkout Fehler:", err);
    return res.status(500).json({ error: "Checkout konnte nicht erstellt werden" });
  }
}
