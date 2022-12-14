import { OrderPayload } from '../types';

interface UserMailProps {
  h1: string;
  h2: string;
  order: string;
  bankTitle: string;
  bankReceiver: string;
  bankName: string;
  bankAccount: string;
  bankAddress: string;
  totalTitle: string;
  ws1Title: string;
  ws2Title: string;
  indivTitle: string;
  paymentTitle: string;
  paymentBank: string;
  paymentStripe: string;
  paymentPayPal: string;
  hour: string;
  orderPayload: OrderPayload;
  paymentMessage: string;
}

export const getUserMailContent = (props: UserMailProps) => {
  const {
    h1,
    h2,
    order,
    bankTitle,
    bankReceiver,
    bankName,
    bankAccount,
    bankAddress,
    ws1Title,
    ws2Title,
    indivTitle,
    hour,
    totalTitle,
    paymentTitle,
    paymentBank,
    paymentPayPal,
    paymentStripe,
    paymentMessage,
  } = props;
  const { technique, choreo, indiv, indivHours, total, payment } = props.orderPayload;

  const paymentMenthod = () => {
    if (payment === 'Bank') return paymentBank;
    if (payment === 'Card') return paymentStripe;
    if (payment === 'PayPal') return paymentPayPal;
    else return '';
  };

  return `<html>
  <body>
  <h1>${h1}</h1>
  <hr />
  <h2>${h2}</h2>
  <p><b>${order}</b></p>
  ${technique ? `<p>- ${ws1Title}</p>` : ''}
  ${choreo ? `<p>- ${ws2Title}</p>` : ''}
  ${indiv ? '- ' + indivTitle + ' ' + indivHours + hour : ''}
  <p><b>${totalTitle + ': ' + total}PLN</b></p>
  <p>${paymentTitle + ': ' + paymentMenthod()}</p>
  ${
    payment === 'Bank'
      ? `<p><b>${bankTitle}</b></p>
  <p>${bankReceiver}</p>
  <p>${bankName}</p>
  <p>${bankAccount}</p>
  <p>${bankAddress}</p>
  `
      : ''
  }
<p>${paymentMessage}</p>
  </body>
  </html>`;
};
