/**
 * Email the report to an employee
 */
import emailConfig from '../configuration/email';
import nodemailer from 'nodemailer';
import { SESClient } from "@aws-sdk/client-ses";
import { SendRawEmailCommand } from "@aws-sdk/client-ses";

// Initialize the SES client
const sesClient = new SESClient({
  region: emailConfig.region,
  credentials: {
    accessKeyId: emailConfig.accessKeyId,
    secretAccessKey: emailConfig.secretAccessKey,
  },
});

const sourceEmail = emailConfig.sourceEmail as string;

// Create a custom SES transport for nodemailer
let transporter = nodemailer.createTransport({
  SES: { 
    ses: sesClient,
    aws: { SendRawEmailCommand },
  },
});


/**
 * Send PDF Report to employee
 * @param email Employee Email
 * @param name Employee Name
 * @returns Promise
 */
const sendReport = async (email: string, name: string, content: Buffer) => {
  const response = await transporter.sendMail({
    from: sourceEmail,
    to: sourceEmail,
    subject: 'Sleep Health Screen Report',
    text: 'Thank you for completing your Sleep Health Screen. Please find your report attached.\nSleep Science Team.',
    attachments: [
      {
        filename: `${name}-Report.pdf`,
        content,
        contentType: 'application/pdf',
      },
    ],
  });
  return response;
};

export default sendReport;
