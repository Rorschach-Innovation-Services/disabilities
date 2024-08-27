import { Administrator } from '../../models';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../middleware/JWT';
import {
  getRequestBody,
  APIGatewayEvent,
  sendResponse,
} from '../../utilities/api';
import { Request, Response } from 'express';

export const signIn = async (request: Request, response: Response) => {
  try {
    // const requestBody = getRequestBody(event);
    const requestBody = request.body;
    // if (!requestBody) return sendResponse({ statusCode: 400, body: 'Request Body is required!' });
    const { email, password } = requestBody;
    console.log('requestBody', requestBody);
    const adminResponse = await Administrator.query(
      { _en: 'administrator' },
      { index: 'gsIndex', limit: 1 },
    );
    const admins = adminResponse.items;
    if (!admins || admins.length === 0)
      return response
        .status(400)
        .send({ message: 'User does not exist. Please Request Registration' });
    // return sendResponse({ statusCode: 400, body: 'User does not exist. Please Request Registration' });
    const admin = admins[0];

    if (Object.keys(admin).length === 0) {
      return response
        .status(400)
        .send({ message: 'User does not exist. Please Request Registration' });
      // return sendResponse({ statusCode: 400, body: 'User does not exist. Please Request Registration' });
    } else {
      if (admin.deleted)
        return response.status(400).send({
          message: 'User does no longer exist. Please Request Registration',
        });
      // return sendResponse({ statusCode: 400, body: 'User does no longer exist. Please Request Registration' });
      const verified = await bcrypt.compare(password, admin.password || '');
      if (!verified) {
        return response
          .status(400)
          .send({ message: 'Incorrect Email/Password' });
        // return sendResponse({ statusCode: 400, body: 'Incorrect Email/Password' });
      }
      const token = generateToken({ email, role: 'admin' });
      admin.password = '';
      return response
        .status(200)
        .send({ message: 'Successful login', token, admin });
      // return sendResponse({ statusCode: 200, body: { message: 'Successful login', token, admin } });
    }
  } catch (error) {
    console.error('Error in signIn', error);
    return response.status(500).send({ message: 'Internal Server Error' });
    // return sendResponse({ statusCode: 500, body: 'Internal Server Error' });
  }
};
