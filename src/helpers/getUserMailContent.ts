import { OrderPayload } from '../types';

interface UserMailProps {
  h1: string;
  h2: string;
  order: string;
  bankTitle: string;
  bankOther: string;
  totalTitle: string;
  ws1Title: string;
  ws2Title: string;
  indivTitle: string;
  paymentTitle: string;
  hour: string;
  orderPayload: OrderPayload;
}

export const getUserMailContent = (props: UserMailProps) => {
  const {
    h1,
    h2,
    order,
    bankTitle,
    bankOther,
    ws1Title,
    ws2Title,
    indivTitle,
    hour,
    totalTitle,
    paymentTitle,
  } = props;
  const { technique, choreo, indiv, indivHours, total, payment } = props.orderPayload;

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
  <p>${paymentTitle + ': ' + payment}</p>
  </body>
  </html>`;
};
