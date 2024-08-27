import { Administrator } from '../../models';
import {
  getQueryStringParameters,
  getRequestBody,
  APIGatewayEvent,
} from '../../utilities/api';
import { Request, Response } from 'express';

export const updatePhoto = async (request: Request, response: Response) => {
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
    const { photo } = requestBody;
    const admin = await Administrator.get({ id });
    if (!admin) {
      return response.status(400).json({ message: 'Admin Not Found!' });
      // return { message: 'Admin Not Found!' };
    }
    await Administrator.update({ id }, { photo });
    return response.status(200).json({ photo });
    // return { photo };
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
