/**
 * Get a companies consulted by an admin
 */
import { Company, Administrator } from '../../models';
import { getQueryStringParameters, APIGatewayEvent } from 'src/utilities/api';

export const getCompany = async (event: APIGatewayEvent) => {
  try {
    const parameters = getQueryStringParameters(event);
    if (!parameters?.id)
      return { statusCode: 400, message: 'Admin ID is required!' };
    const company = await Company.get({ id: parameters.id });
    if (!company || company.deleted) {
      return { message: 'Company Not Found' };
    }
    const admin = await Administrator.get({
      id: company.adminId,
    });
    if (!admin) {
      return { company, message: 'Admin not found' };
    }
    return { company, admin: admin.name };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
