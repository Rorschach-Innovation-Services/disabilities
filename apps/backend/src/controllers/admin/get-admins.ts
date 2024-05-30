import { Administrator } from '../../models';
import {
  getQueryStringParameters,
  getRequestBody,
  getRequestHeaders,
  getRequestPath,
  APIGatewayEvent,
} from 'src/utilities/api';

export const getAdmins = async (event: APIGatewayEvent) => {
  try {
    console.log('Event', event);
    const requestBody = getRequestBody(event);
    const requestPath = getRequestPath(event);
    const requestHeaders = getRequestHeaders(event);
    const queryStringParams = getQueryStringParameters(event);

    console.log('Request Body:', requestBody);
    console.log('Request Path:', requestPath);
    console.log('Request Headers:', requestHeaders);
    console.log('Query String Parameters:', queryStringParams);
    const adminsResponse = await Administrator.query(
      { _en: 'administrator' },
      { index: 'gsIndex' }
    );
    const admins = adminsResponse.items;
    if (!admins) {
      return { message: 'Admins Not Found!' };
    }
    const adminsRes = admins.filter((admin) => !admin.deleted);
    return { admins: adminsRes };
  } catch (error) {
    console.error(error);
    return { message: 'Internal Server Error' };
  }
};
