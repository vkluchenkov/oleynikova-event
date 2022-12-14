// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { OrderPayload } from '../../src/types';

//@ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: null });

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const orderPayload: OrderPayload = req.body;
  const { name, email, total, lng } = orderPayload;

  const item = {
    price_data: {
      currency: 'pln',
      product_data: {
        name,
      },
      unit_amount: total.grandTotal * 100,
    },
    quantity: 1,
  };

  if (req.method === 'POST') {
    try {
      await axios.post(`${req.headers.origin}/api/submit`, orderPayload).then(async (result) => {
        const session = await stripe.checkout.sessions.create({
          customer_email: email,
          line_items: [item],
          mode: 'payment',
          success_url: `${req.headers.origin}/${lng != 'en' ? lng : ''}/thank-you`,
          cancel_url: `${req.headers.origin}`,
          payment_method_types: [],
        });
        res.status(200).send({ url: session.url });
      });
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

export default handler;
