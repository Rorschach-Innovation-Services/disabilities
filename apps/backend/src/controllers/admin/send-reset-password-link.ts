import { Administrator } from '../../models';
import sendEmail from '../../utilities/sendEmail';
import { getRequestBody, APIGatewayEvent } from '../../utilities/api';
import { Request, Response } from 'express';

export const sendResetLink = async (request: Request, response: Response) => {
  try {
    const requestBody = request.body;
    // if (!requestBody)
    //   return { statusCode: 400, message: 'Request Body is required!' };
    const adminResponse = await Administrator.query(
      { _en: 'administrator' },
      { index: 'gsIndex', limit: 1 },
    );
    const admins = adminResponse.items;
    if (!admins || admins.length === 0) {
      return response.status(400).json({ message: 'Admin Not Found!' });
      // return { message: 'Admin Not Found!' };
    }
    const admin = admins[0];
    const emailPromise = await sendEmail(
      requestBody.email,
      admin.name || '',
      'Reset Password',
      `Please click on the link to reset your password: http://localhost:5173/create-password/${admin.id}`,
    );
    return response
      .status(200)
      .json({ message: 'Link Sent', data: emailPromise });
    // return { message: 'Link Sent', data: emailPromise };
  } catch (error: unknown) {
    return response.status(500).send({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
