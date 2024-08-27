import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { Administrator } from '../../models';
import {
  getQueryStringParameters,
  getRequestBody,
  APIGatewayEvent,
} from '../../utilities/api';
import { Request, Response } from 'express';

export const updatePassword = async (request: Request, response: Response) => {
  try {
    // const parameters = getQueryStringParameters(event);
    // const requestBody = getRequestBody(event);
    const requestBody = request.body;
    const parameters = request.params;
    // if (!requestBody)
    //   return { statusCode: 400, message: 'Request Body is required!' };
    // if (!parameters?.id)
    //   return { statusCode: 400, message: 'Admin ID is required!' };
    const { id } = parameters;
    const { password, newPassword } = requestBody;
    const saltRounds = 12;
    const admin = await Administrator.get({ id });
    if (Object.keys(admin).length === 0) {
      return response.status(400).json({ message: 'Admin Not Found!' });
      // return { statusCode: 400, message: 'Admin Not Found!' };
    }
    const verified = compareSync(password, admin.password || '');
    if (!verified) {
      return response.status(400).send({ message: 'Incorrect Password' });
      // return { message: 'Incorrect Password' };
    }
    const salt = genSaltSync(saltRounds);
    const hash = hashSync(newPassword, salt);
    await Administrator.update({ id }, { password: hash });
    return response.status(200).json({ message: 'Password Updated' });
    // return { message: 'Password Updated' };
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
