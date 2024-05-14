import { Request, Response } from 'express';
import { Administrator } from '../../models';
import sendEmail from '../../utilities/sendEmail';

export default async (request: Request, response: Response) => {
  try {
    const { email } = request.body;
    const adminResponse = await Administrator.query(
      { gspk: 'administrators' },
      { index: 'GSI1', limit: 1 }
    );
    const admins = adminResponse.Items;
    if (!admins || admins.length === 0) {
      return response.status(400).json({ message: 'Admin Not Found!' });
    }
    const admin = admins[0];
    const emailPromise = await sendEmail(
      email,
      admin.name || '',
      'Reset Password',
      `Please click on the link to reset your password: https://sleepscience.co.za/create-password/${admin.id}`
    );

    return response
      .status(200)
      .json({ message: 'Link Sent', data: emailPromise });
  } catch (error: unknown) {
    return response.status(500).send({ message: 'Internal Server Error' });
  }
};
