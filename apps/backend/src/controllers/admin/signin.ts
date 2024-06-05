import { Administrator } from '../../models';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../middleware/JWT';
import { getRequestBody, APIGatewayEvent, sendResponse } from 'src/utilities/api';

export const signIn = async (event: APIGatewayEvent) => {
  try {
    const requestBody = getRequestBody(event);
    if (!requestBody) return sendResponse({ statusCode: 400, body: 'Request Body is required!' });
    const { email, password } = requestBody;
    console.log("requestBody", requestBody)
    const adminResponse = await Administrator.query(
      { _en: 'administrator' },
      { index: 'gsIndex', limit: 1 }
    );
    const admins = adminResponse.items;
    if (!admins || admins.length === 0) return sendResponse({ statusCode: 400, body: 'User does not exist. Please Request Registration' });
    const admin = admins[0];

    if (Object.keys(admin).length === 0) {
      return sendResponse({ statusCode: 400, body: 'User does not exist. Please Request Registration' });
    } else {
      if (admin.deleted)
        return sendResponse({ statusCode: 400, body: 'User does no longer exist. Please Request Registration' });
      const verified = await bcrypt.compare(password, admin.password || '');
      if (!verified) {
        return sendResponse({ statusCode: 400, body: 'Incorrect Email/Password' });
      }
      const token = generateToken({ email, role: 'admin' });
      admin.password = '';
      return sendResponse({ statusCode: 200, body: { message: 'Successful login', token, admin } });
    }
  } catch (error) {
    console.error('Error in signIn', error);
    return sendResponse({ statusCode: 500, body: 'Internal Server Error' });
  }
};
