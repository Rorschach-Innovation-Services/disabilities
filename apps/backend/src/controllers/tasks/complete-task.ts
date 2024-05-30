/**
 * Complete Task Controller
 */
import { Task } from '../../models';
import {
  getQueryStringParameters,
  getRequestBody,
  APIGatewayEvent,
} from 'src/utilities/api';

export const completeTask = async (event: APIGatewayEvent) => {
  try {
    const parameters = getQueryStringParameters(event);
    const requestBody = getRequestBody(event);
    if (!requestBody)
      return { statusCode: 400, message: 'Request Body is required!' };
    if (!parameters?.id)
      return { statusCode: 400, message: 'Admin ID is required!' };
    const { id } = parameters;
    const { complete } = requestBody;
    const task = await Task.get({ id });
    await Task.update({ id }, { complete });
    return { message: 'Task Complete', task: { ...task, complete } };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
