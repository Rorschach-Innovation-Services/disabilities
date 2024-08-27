import { Administrator } from '../../models';
import {
  getQueryStringParameters,
  getRequestBody,
  APIGatewayEvent,
} from '../../utilities/api';
import { Request, Response } from 'express';

export const updateEmail = async (request: Request, response: Response) => {
  try {
    // const parameters = getQueryStringParameters(event);
    const parameters = request.params;
    // const requestBody = getRequestBody(event);
    const requestBody = request.body;
    // if (!requestBody)
    //   return { statusCode: 400, message: 'Request Body is required!' };
    // if (!parameters?.id)
    //   return { statusCode: 400, message: 'Admin ID is required!' };
    const { id } = parameters;
    const { email, secondaryEmail } = requestBody;
    const admin = await Administrator.get({ id });
    if (!admin) {
      return response.status(400).json({ message: 'Admin Not Found!' });
      // return { message: 'Admin Not Found!' };
    }
    const updatedAdmin = await Administrator.update(
      { id },
      { email, secondaryEmail },
    );
    updatedAdmin.password = '';
    return response.status(200).json({ admin: updatedAdmin });
    // return { admin: updatedAdmin };
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
