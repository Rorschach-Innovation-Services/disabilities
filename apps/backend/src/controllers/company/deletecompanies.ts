/**
 * Responsible for marking a list of companies as deleted but not deleting from db
 *
 * */
import { Company } from '../../models/company.model';
import { getRequestBody, APIGatewayEvent } from 'src/utilities/api';

export const deleteCompanies = async (event: APIGatewayEvent) => {
  try {
    const requestBody = getRequestBody(event);
    if (!requestBody)
      return { statusCode: 400, message: 'Request Body is required!' };
    for (const id of requestBody.companyIDs) {
      await Company.update({ id }, { deleted: true });
    }
    return { message: 'Companies successfully deleted' };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
