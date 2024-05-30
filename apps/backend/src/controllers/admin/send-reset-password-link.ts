import { Administrator } from '../../models';
import sendEmail from '../../utilities/sendEmail';
import { getRequestBody, APIGatewayEvent } from 'src/utilities/api';

export const sendResetLink = async (event: APIGatewayEvent) => {
  try {
    const requestBody = getRequestBody(event);
    if (!requestBody)
      return { statusCode: 400, message: 'Request Body is required!' };
    const adminResponse = await Administrator.query(
      { _en: 'administrator' },
      { index: 'gsIndex', limit: 1 }
    );
    const admins = adminResponse.items;
    if (!admins || admins.length === 0) {
      return { message: 'Admin Not Found!' };
    }
    const admin = admins[0];
    const emailPromise = await sendEmail(
      requestBody.email,
      admin.name || '',
      'Reset Password',
      `Please click on the link to reset your password: http://localhost:5173/create-password/${admin.id}`
    );

    return { message: 'Link Sent', data: emailPromise };
  } catch (error: unknown) {
    return { message: 'Internal Server Error' };
  }
};
