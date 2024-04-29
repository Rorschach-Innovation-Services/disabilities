/**
 * Email SES config variables
 */

export default {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID || "AKIA54JRBCS4JA7DK7ZE",
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY || "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",
    region: process.env.AWS_REGION || "af-south-1",
    sourceEmail: process.env.AWS_SES_SOURCE_EMAIL || "info@sleepscience.co.za"
}