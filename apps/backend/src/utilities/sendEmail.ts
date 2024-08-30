/**
 * Sending Emails to users
 */
import { SESClient, SendEmailCommand, SendEmailCommandInput } from "@aws-sdk/client-ses";
import emailConfig from '../configuration/email';

const sourceEmail = emailConfig.sourceEmail as string;
const sesClient = new SESClient({
  region: emailConfig.region,
  credentials: {
    accessKeyId: emailConfig.accessKeyId,
    secretAccessKey: emailConfig.secretAccessKey,
  },
});

/**
 * Send Email To Users
 * @param email The email address to send to
 * @param name of the user
 * @param subject Subject of the email
 * @param message For the email body
 * @returns Promise
 */
const emailSend = async (
  email: string,
  name: string,
  subject: string,
  message: string
) => {
  const HtmlMessage = `<h3>Hi ${name}, </h3><p>${message}</p><p>Kind Regards,</p><p>Sleep Science Team.</p>`;
  const TextMessage = `Hi ${name},\n${message}\nKind Regards,\nSleep Science Team.</p>`;
  /** Content and details of the email */
  const params: SendEmailCommandInput = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: HtmlMessage,
        },
        Text: {
          Charset: 'UTF-8',
          Data: TextMessage,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
    Source: sourceEmail,
  };
    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);
    return response;
};
export default emailSend;
