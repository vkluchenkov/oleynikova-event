import { OrderPayload } from '../types';
import mjml2html from 'mjml';
import { logo } from '../utils/logo';

interface UserMailProps {
  hi: string;
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
  paymentMessage: string;
  orderPayload: OrderPayload;
}

export const getUserMailContent = (props: UserMailProps) => {
  const {
    hi,
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

  const { technique, choreo, indiv, indivHours, total, payment, name } = props.orderPayload;

  const paymentMenthod = () => {
    if (payment === 'Bank') return paymentBank;
    if (payment === 'Card') return paymentStripe;
    if (payment === 'PayPal') return paymentPayPal;
    else return '';
  };

  const template = `<mjml>
  <mj-head>
    <mj-font name="Inter" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900" />
    <mj-attributes>
      <mj-text font-family="Inter, Helvetica, Arial, sans-serif" font-weight="400" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#eee">
    <!-- Header -->
    <mj-section background-color="white">
      <mj-column>
        <mj-image
          src="https://intensive.aliah.dance/images/Aliah_team_BLACK.png"
          width="250px"
          alt="Aliah Team Logo"
        />
        <mj-text align="center" letter-spacing="15px" padding="10px 0 0 3px"> presents </mj-text>
        <mj-text
          font-size="40px"
          font-weight="900"
          text-transform="uppercase"
          align="center"
          padding="30px 0 0 0"
        >
          Ekaterina Oleynikova
        </mj-text>
        <mj-text align="center" font-size="16px"> Intensive dance weekend in Warsaw </mj-text>
        <mj-divider border-width="1px" padding="25px 0 0" />
      </mj-column>
    </mj-section>

    <!-- Main section -->
    <mj-section background-color="white" padding-bottom="50px">
      <mj-column>
        <mj-text font-size="18px" line-height="1.5" font-weight="600">${hi + ' ' + name}!</mj-text>

        <mj-text font-size="18px" line-height="1.5">${h2}</mj-text>

        <!-- Workshops breakdown -->
        <mj-text
          font-size="18px"
          line-height="1.5"
          font-weight="600"
          padding-top="25px"
          padding-bottom="0"
          >${order}</mj-text
        >
        <mj-text font-size="18px" line-height="1.5" padding="0">
          <ul>
            ${technique ? `<li>${ws1Title}</li>` : ''}
            ${choreo ? `<li>${ws2Title}</li>` : ''}
            ${indiv ? `<li>${indivTitle} ${indivHours + hour}</li>` : ''}
          </ul>
        </mj-text>
        <mj-text font-size="18px" line-height="1.5" font-weight="600" padding-bottom="0">
          ${totalTitle}: ${total.total}PLN
        </mj-text>
        <mj-text font-size="18px" line-height="1.5" font-weight="600" padding-top="0">
        ${paymentTitle + ': ' + paymentMenthod()}
        </mj-text>
        ${
          payment === 'Bank'
            ? `<!-- Bank details -->
        <mj-divider border-width="1px" padding="25px 0 25px" />
        <mj-text
          font-size="18px"
          line-height="1.5"
          font-weight="600"
          padding-top="25px"
          padding-bottom="0"
          >${bankTitle}</mj-text
        >
        <mj-text font-size="18px" line-height="1.5" padding-bottom="0" padding-top="0">${bankReceiver}</mj-text>
        <mj-text font-size="18px" line-height="1.5" padding-bottom="0" padding-top="0">${bankName}</mj-text>
        <mj-text font-size="18px" line-height="1.5" padding-bottom="0" padding-top="0">${bankAccount}</mj-text>
        <mj-text font-size="18px" line-height="1.5" padding-bottom="0" padding-top="0">${bankAddress}</mj-text>
`
            : ''
        }
        <mj-text font-size="18px" line-height="1.5" padding-bottom="0">${paymentMessage}</mj-text>
              </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section background-color="#eee">
      <mj-column>
        <mj-text align="center" padding="0"> ©2022 Aliah Bellydance Team </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;

  return mjml2html(template).html;
};
