/**
 * Get a companies consulted by an admin
 */
import { Company } from '../../models';
import {
  getQueryStringParameters,
  getRequestBody,
  APIGatewayEvent,
} from '../../utilities/api';
import { Request, Response } from 'express';

export const updateCompany = async (request: Request, response: Response) => {
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
    const company = await Company.get({ id });
    await Company.update({ id }, { ...requestBody });
    if (!company || company.deleted) {
      return response.status(400).json({ message: 'Company Not Found!' });
      // return { message: 'Company Not Found' };
    }
    // return { message: 'Updated successfully.', company };
    return response
      .status(200)
      .json({ message: 'Updated successfully.', company });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
