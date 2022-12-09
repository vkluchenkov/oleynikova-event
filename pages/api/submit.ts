// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { OrderPayload } from '../../src/types';
import { Client } from '@notionhq/client';
import { indivPrice } from '../../src/utils/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  const orderPayload: OrderPayload = req.body;

  const workshops: Array<{ name: string }> = [];
  orderPayload.ws1 && workshops.push({ name: 'Technique' });
  orderPayload.ws2 && workshops.push({ name: 'Choreo' });

  try {
    await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE!,
        type: 'database_id',
      },
      properties: {
        Name: {
          type: 'title',
          title: [
            {
              type: 'text',
              text: { content: orderPayload.name },
            },
          ],
        },
        Email: {
          type: 'email',
          email: orderPayload.email,
        },
        Workshops: {
          type: 'multi_select',
          multi_select: workshops,
        },
        Private: {
          type: 'number',
          number: orderPayload.indivHours,
        },
        Total: {
          type: 'number',
          number: orderPayload.total,
        },
      },
    });
    res.status(200).send('Ok');
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
