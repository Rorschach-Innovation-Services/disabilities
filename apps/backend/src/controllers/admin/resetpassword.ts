import { genSaltSync, hashSync } from 'bcryptjs';
import { Administrator } from '../../models';
import {
  getQueryStringParameters,
  getRequestBody,
  APIGatewayEvent,
} from '../../utilities/api';
import { Request, Response } from 'express';

export const resetPassword = async (request: Request, response: Response) => {
  try {
    // const parameters = getQueryStringParameters(event);
    // const requestBody = getRequestBody(event);
    const parameters = request.params;
    const requestBody = request.body;
    // if (!requestBody)
    //   return { statusCode: 400, message: 'Request Body is required!' };
    // if (!parameters?.id)
    //   return { statusCode: 400, message: 'Admin ID is required!' };
    const saltRounds = 12;
    const adminResponse = await Administrator.get({ id: parameters.id });
    const admin = adminResponse;
    if (!admin) {
      return response.status(400).json({ message: 'Admin Not Found!' });
      // return { message: 'Admin Not Found!' };
    }
    const salt = genSaltSync(saltRounds);
    const hash = hashSync(requestBody.password, salt);
    await Administrator.update({ id: parameters.id }, { password: hash });
    return response.status(200).json({ message: 'Password Updated' });
    // return { message: 'Password Updated' };
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
