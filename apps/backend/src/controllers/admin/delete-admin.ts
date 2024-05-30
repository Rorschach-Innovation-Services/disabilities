import { Administrator } from '../../models';
import { getQueryStringParameters, APIGatewayEvent } from 'src/utilities/api';

export const deleteAdmin = async (event: APIGatewayEvent) => {
  try {
    const parameters = getQueryStringParameters(event);
    if (!parameters?.id)
      return { statusCode: 400, message: 'Admin ID is required!' };
    const admin = await Administrator.get({ id: parameters.id });
    if (!admin) {
      return { message: 'Admin Not Found!' };
    }
    await Administrator.update({ id: parameters.id }, { deleted: true });
    return { message: 'Admin Deleted' };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
