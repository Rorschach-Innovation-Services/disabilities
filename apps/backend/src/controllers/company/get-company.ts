/**
 * Get a companies consulted by an admin
 */
import { Company, Administrator } from '../../models';
import { getQueryStringParameters, APIGatewayEvent } from '../../utilities/api';
import { Request, Response } from 'express';

export const getCompany = async (request: Request, response: Response) => {
  try {
    // const parameters = getQueryStringParameters(event);
    const parameters = request.params;
    // if (!parameters?.id)
    //   return { statusCode: 400, message: 'Admin ID is required!' };
    const company = await Company.get({ id: parameters.id });
    if (!company || company.deleted) {
      return response.status(400).json({ message: 'Company Not Found!' });
      // return { message: 'Company Not Found' };
    }
    const admin = await Administrator.get({
      id: company.adminId,
    });
    if (!admin) {
      return response
        .status(400)
        .json({ company, message: 'Admin Not Found!' });
      // return { company, message: 'Admin not found' };
    }
    return response.status(200).json({ company, admin: admin.name });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
