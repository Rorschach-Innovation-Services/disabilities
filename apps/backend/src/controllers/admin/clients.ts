import { Administrator, Company } from '../../models';
import { getQueryStringParameters, APIGatewayEvent } from 'src/utilities/api';

export const getClients = async (event: APIGatewayEvent) => {
  try {
    const parameters = getQueryStringParameters(event);
    if (!parameters?.id)
      return { statusCode: 400, message: 'Admin ID is required!' };
    const admin = await Administrator.get({ id: parameters.id });
    if (!admin) {
      return { message: 'Admin Not Found!' };
    }
    const clients = await Company.query(
      { _en: 'company' },
      { index: 'gsIndex' }
    );
    const adminClients = clients.items.filter((client) => {
      return client.adminEmail && !client.deleted
        ? client.adminEmail === parameters.id
        : false;
    });
    return { clients: adminClients };
  } catch (error) {
    console.log(error);
    return { message: 'Internal Server Error' };
  }
};
