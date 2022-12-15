import type { NextApiRequest, NextApiResponse } from 'next';
import { OrderPayload } from '../../src/types';
import { Client } from '@notionhq/client';
import i18next from 'i18next';
const Backend = require('i18next-fs-backend');
import { join } from 'path';
import { sendMail } from '../../src/helpers/sendMail';
import { getAdminEmailContent } from '../../src/helpers/getAdminMailContent';
import { getUserMailContent } from '../../src/helpers/getUserMailContent';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const orderPayload: OrderPayload = req.body;

  await i18next.use(Backend).init({
    ns: ['common'],
    lng: orderPayload.lng,
    fallbackLng: 'en',
    backend: {
      loadPath: join(__dirname, '../../../../public/locales/{{lng}}/{{ns}}.json'),
    },
  });

  const { t } = i18next;

  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  const workshops: Array<{ name: string }> = [];
  orderPayload.technique && workshops.push({ name: 'Technique' });
  orderPayload.choreo && workshops.push({ name: 'Choreo' });

  const adminEmail = process.env.ADMIN_EMAIL;
  const senderEmail = process.env.SENDER_EMAIL;
  const senderName = process.env.SENDER_NAME;
  const adminMailContent = getAdminEmailContent(orderPayload);
  const userMailContent = getUserMailContent({
    orderPayload,
    hi: t('email.hi'),
    h2: t('email.h2'),
    order: t('email.order'),
    bankTitle: t('email.bank_title'),
    bankReceiver: t('email.bank_receiver'),
    bankName: t('email.bank_name'),
    bankAccount: t('email.bank_account'),
    bankAddress: t('email.bank_address'),
    totalTitle: t('form.total'),
    ws1Title: t('ws1.title'),
    ws2Title: t('ws2.title'),
    indivTitle: t('indiv'),
    paymentTitle: t('form.paymenttitle'),
    paymentBank: t('form.bacs'),
    paymentStripe: t('form.stripe'),
    paymentPayPal: t('form.paypal'),
    hour: t('hour'),
    paymentMessage: t('email.payment_message'),
  });

  try {
    sendMail({
      adminEmail: adminEmail!,
      senderEmail: senderEmail!,
      senderName: senderName!,
      userEmail: orderPayload.email,
      userName: orderPayload.name,
      userSubj: t('email.subject_user'),
      userContent: userMailContent,
      adminSubj: 'New registration to Oleynikova intensive',
      adminContent: adminMailContent,
    });

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
          number: orderPayload.indiv ? orderPayload.indivHours : 0,
        },
        Total: {
          type: 'number',
          number: orderPayload.total.total,
        },
        Fee: {
          type: 'number',
          number: orderPayload.total.fee,
        },
        GrandTotal: {
          type: 'number',
          number: orderPayload.total.grandTotal,
        },
        Payment: {
          type: 'select',
          select: { name: orderPayload.payment ? orderPayload.payment : '' },
        },
      },
    });
    res.status(200).send('Ok');
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
