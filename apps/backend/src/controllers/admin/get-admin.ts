import { Administrator } from '../../models';
import { getQueryStringParameters, APIGatewayEvent } from 'src/utilities/api';

export const getAdmin = async (event: APIGatewayEvent) => {
  try {
    const parameters = getQueryStringParameters(event);
    if (!parameters?.id)
      return { statusCode: 400, message: 'Admin ID is required!' };
    const admin = await Administrator.get({ id: parameters.id });
    if (!admin) {
      return { message: 'Admin Not Found!' };
    }
    admin.password = '';
    return { admin };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
