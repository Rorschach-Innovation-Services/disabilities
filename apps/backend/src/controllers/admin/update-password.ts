import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { Administrator } from '../../models';
import {
  getQueryStringParameters,
  getRequestBody,
  APIGatewayEvent,
} from 'src/utilities/api';

export const updatePassword = async (event: APIGatewayEvent) => {
  try {
    const parameters = getQueryStringParameters(event);
    const requestBody = getRequestBody(event);
    if (!requestBody)
      return { statusCode: 400, message: 'Request Body is required!' };
    if (!parameters?.id)
      return { statusCode: 400, message: 'Admin ID is required!' };
    const { id } = parameters;
    const { password, newPassword } = requestBody;
    const saltRounds = 10;
    const admin = await Administrator.get({ id });
    if (!admin) {
      return { message: 'Admin Not Found!' };
    }
    const verified = compareSync(password, admin.password || '');
    if (!verified) {
      return { message: 'Incorrect Password' };
    }
    const salt = genSaltSync(saltRounds);
    const hash = hashSync(newPassword, salt);
    await Administrator.update({ id }, { password: hash });
    return { message: 'Password Updated' };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
