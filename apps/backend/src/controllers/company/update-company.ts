/**
 * Get a companies consulted by an admin
 */
import { Company } from '../../models';
import {
  getQueryStringParameters,
  getRequestBody,
  APIGatewayEvent,
} from 'src/utilities/api';

export const updateCompany = async (event: APIGatewayEvent) => {
  try {
    const parameters = getQueryStringParameters(event);
    const requestBody = getRequestBody(event);
    if (!requestBody)
      return { statusCode: 400, message: 'Request Body is required!' };
    if (!parameters?.id)
      return { statusCode: 400, message: 'Admin ID is required!' };
    const { id } = parameters;
    const company = await Company.get({ id });
    await Company.update({ id }, { ...requestBody });
    if (!company || company.deleted) {
      return { message: 'Company Not Found' };
    }
    return { message: 'Updated successfully.', company };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
