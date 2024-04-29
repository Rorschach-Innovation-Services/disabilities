/**
 * Sending Emails to users
 */
import { config, SES } from 'aws-sdk';
import emailConfig from '../configuration/email.config';

config.update({
    region: emailConfig.region,
    accessKeyId: emailConfig.accessKeyId,
    secretAccessKey: emailConfig.secretAccessKey
});
const sourceEmail = emailConfig.sourceEmail as string;

/**
 * Send Email To Users
 * @param email The email address to send to
 * @param name of the user
 * @param subject Subject of the email
 * @param message For the email body
 * @returns Promise
 */
const emailSend = (email: string, name: string, subject: string, message: string) => {
    const HtmlMessage = `<h3>Hi ${name}, </h3><p>${message}</p><p>Kind Regards,</p><p>Sleep Science Team.</p>`;
    const TextMessage = `Hi ${name},\n${message}\nKind Regards,\nSleep Science Team.</p>`
    /** Content and details of the email */
    const params: SES.SendEmailRequest = {
        Destination: {
            ToAddresses: [
                email
            ]
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: HtmlMessage
                },
                Text: {
                    Charset: 'UTF-8',
                    Data: TextMessage
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject
            }
        },
        Source: sourceEmail
    }
    const sendPromise = new SES({ apiVersion: '2010-12-01'}).sendEmail(params).promise();
    return sendPromise;
}
export default emailSend;