import MJMLParseResults from 'mjml';

const SibApiV3Sdk = require('sib-api-v3-sdk');
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.SENDINBLUE_SECRET;

interface SendMailProps {
  adminEmail: string;
  senderEmail: string;
  senderName: string;
  userEmail: string;
  userName: string;
  userSubj: string;
  userContent: string;
  adminSubj: string;
  adminContent: string;
}

export const sendMail = (props: SendMailProps) => {
  const {
    adminEmail,
    senderEmail,
    senderName,
    userEmail,
    userName,
    userSubj,
    adminSubj,
    userContent,
    adminContent,
  } = props;

  new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
    sender: { email: senderEmail, name: senderName },
    subject: userSubj,
    htmlContent: `<html></html>`,
    messageVersions: [
      // Admin email
      {
        to: [
          {
            name: 'Admin',
            email: adminEmail,
          },
        ],
        subject: adminSubj,
        htmlContent: adminContent,
      },
      // User email
      {
        to: [
          {
            name: userName,
            email: userEmail,
          },
        ],
        subject: userSubj,
        htmlContent: userContent,
      },
    ],
  });
};
