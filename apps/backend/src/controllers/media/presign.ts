import { Request, Response } from 'express';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const region = process.env.AWS_REGION || 'af-south-1';
const bucket = process.env.BUCKET_NAME || 'unique-profile-images';

const s3 = new S3Client({ region });

export const companyLogoUploadUrl = async (request: Request, response: Response) => {
  try {
    const { companyId, filename, contentType } = request.body || {};
    if (!companyId || !filename) {
      return response.status(400).json({ message: 'companyId and filename are required' });
    }
    const key = `companies/${companyId}/logo/${filename}`;
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType || 'application/octet-stream',
    });
    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    const publicUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
    return response.status(200).json({ uploadUrl, key, publicUrl });
  } catch (error) {
    console.error('Error generating upload URL', error);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

export const companyLogoGetUrl = async (request: Request, response: Response) => {
  try {
    const { key } = request.query as any;
    if (!key) return response.status(400).json({ message: 'key is required' });

    const preferPresign = String(process.env.MEDIA_PRESIGN_GET || '').toLowerCase() === 'true';
    const publicUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

    if (!preferPresign) {
      return response.status(200).json({ url: publicUrl });
    }
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return response.status(200).json({ url });
  } catch (error) {
    console.error('Error generating get URL', error);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

