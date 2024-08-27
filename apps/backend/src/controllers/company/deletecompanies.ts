/**
 * Responsible for marking a list of companies as deleted but not deleting from db
 *
 * */
import { Company } from '../../models/company.model';
import { getRequestBody, APIGatewayEvent } from '../../utilities/api';
import { Request, Response } from 'express';

export const deleteCompanies = async (request: Request, response: Response) => {
  try {
    const requestBody = request.body;
    // const requestBody = getRequestBody(event);
    // if (!requestBody)
    //   return { statusCode: 400, message: 'Request Body is required!' };
    for (const id of requestBody.companyIDs) {
      await Company.update({ id }, { deleted: true });
    }
    return response
      .status(200)
      .json({ message: 'Companies successfully deleted' });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
