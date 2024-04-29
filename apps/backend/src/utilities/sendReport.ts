/**
 * Email the report to an employee
 */
import { SES, config } from 'aws-sdk';
import emailConfig from '../configuration/email.config';
import nodemailer from 'nodemailer';
import path from 'path';

config.update({
    region: emailConfig.region,
    accessKeyId: emailConfig.accessKeyId,
    secretAccessKey: emailConfig.secretAccessKey
});
const sourceEmail = emailConfig.sourceEmail as string;
const ses = new SES({ apiVersion: '2010-12-01'})
let transporter = nodemailer.createTransport({ SES: ses});

/**
 * Send PDF Report to employee
 * @param email Employee Email
 * @param name Employee Name
 * @returns Promise
 */
const sendReport = async (email: string, name: string, content:Buffer) => {
    const response = await transporter.sendMail({
        from: sourceEmail,
        to: sourceEmail,
        subject: 'Sleep Health Screen Report',
        text: 'Thank you for completing your Sleep Health Screen. Please find your report attached.\nSleep Science Team.',
        attachments: [
            {
                filename: `${name}-Report.pdf`,
                content,
                contentType: 'application/pdf'
            }
        ]
    });
    return response;
}

export default sendReport;
