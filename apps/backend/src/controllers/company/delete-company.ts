/**
 * Responsible for marking a list of companies as deleted but not deleting from db
 *
 * */
import { Company } from '../../models/company.model';
import { getQueryStringParameters, APIGatewayEvent } from 'src/utilities/api';

export const deleteCompany = async (event: APIGatewayEvent) => {
  try {
    const parameters = getQueryStringParameters(event);
    if (!parameters?.id)
      return { statusCode: 400, message: 'Admin ID is required!' };
    const { id } = parameters;
    await Company.update({ id }, { deleted: true });
    return { message: 'Company successfully deleted' };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
