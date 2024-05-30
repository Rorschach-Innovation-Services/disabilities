import { Administrator } from '../../models';
import {
  getQueryStringParameters,
  getRequestBody,
  APIGatewayEvent,
} from 'src/utilities/api';

export const updatePhoto = async (event: APIGatewayEvent) => {
  try {
    const parameters = getQueryStringParameters(event);
    const requestBody = getRequestBody(event);
    if (!requestBody)
      return { statusCode: 400, message: 'Request Body is required!' };
    if (!parameters?.id)
      return { statusCode: 400, message: 'Admin ID is required!' };
    const { id } = parameters;
    const { photo } = requestBody;
    const admin = await Administrator.get({ id });
    if (!admin) {
      return { message: 'Admin Not Found!' };
    }
    await Administrator.update({ id }, { photo });
    return { photo };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
