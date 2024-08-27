/**
 * Responsible for marking a list of companies as deleted but not deleting from db
 *
 * */
import { Company } from '../../models/company.model';
import { getQueryStringParameters, APIGatewayEvent } from '../../utilities/api';
import { Request, Response } from 'express';

export const deleteCompany = async (request: Request, response: Response) => {
  try {
    // const parameters = getQueryStringParameters(event);
    const parameters = request.params;
    // if (!parameters?.id)
    //   return { statusCode: 400, message: 'Admin ID is required!' };
    const { id } = parameters;
    await Company.update({ id }, { deleted: true });
    // return { message: 'Company successfully deleted' };
    return response
      .status(200)
      .json({ message: 'Company successfully deleted' });
  } catch (error) {
    console.error('error', error);
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
