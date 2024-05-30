import { Administrator } from '../../models';
import {
  getQueryStringParameters,
  getRequestBody,
  APIGatewayEvent,
} from 'src/utilities/api';

export const updateEmail = async (event: APIGatewayEvent) => {
  try {
    const parameters = getQueryStringParameters(event);
    const requestBody = getRequestBody(event);
    if (!requestBody)
      return { statusCode: 400, message: 'Request Body is required!' };
    if (!parameters?.id)
      return { statusCode: 400, message: 'Admin ID is required!' };
    const { id } = parameters;
    const { email, secondaryEmail } = requestBody;
    const admin = await Administrator.get({ id });
    if (!admin) {
      return { message: 'Admin Not Found!' };
    }
    const updatedAdmin = await Administrator.update(
      { id },
      { email, secondaryEmail }
    );
    updatedAdmin.password = '';
    return { admin: updatedAdmin };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
