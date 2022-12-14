import { OrderPayload } from '../types';

export const getAdminEmailContent = (orderPayload: OrderPayload) => {
  const { name, email, technique, choreo, indiv, indivHours, payment, total } = orderPayload;
  return `<html>
<body>
<h1>New registration to intensive with Ekaterina</h1>
<hr />
<h2>${name}</h2>
<p>${email}</p>
<p><b>Workshops:</b></p>
${technique ? '<p>- Technique</p>' : ''}
${choreo ? '<p>- Choreography</p>' : ''}
${indiv ? '- Individiual classes: ' + indivHours + 'h' : ''}
<p><b>Total: ${total.grandTotal}PLN</b></p>
<p>Fee: ${total.fee}PLN</p>
<p>Payment method: ${payment}</p>
</body>
</html>`;
};
