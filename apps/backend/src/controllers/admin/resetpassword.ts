import { genSaltSync, hashSync } from 'bcryptjs';
import { Administrator } from '../../models';
import {
  getQueryStringParameters,
  getRequestBody,
  APIGatewayEvent,
} from 'src/utilities/api';

export const resetPassword = async (event: APIGatewayEvent) => {
  try {
    const parameters = getQueryStringParameters(event);
    const requestBody = getRequestBody(event);
    if (!requestBody)
      return { statusCode: 400, message: 'Request Body is required!' };
    if (!parameters?.id)
      return { statusCode: 400, message: 'Admin ID is required!' };
    const saltRounds = 12;
    const adminResponse = await Administrator.get({ id: parameters.id });
    const admin = adminResponse;
    if (!admin) {
      return { message: 'Admin Not Found!' };
    }
    const salt = genSaltSync(saltRounds);
    const hash = hashSync(requestBody.password, salt);
    await Administrator.update({ id: parameters.id }, { password: hash });
    return { message: 'Password Updated' };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
