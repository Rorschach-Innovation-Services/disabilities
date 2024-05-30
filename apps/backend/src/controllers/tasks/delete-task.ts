/**
 * Delete Task Controller
 */
import { Task } from '../../models';
import { getQueryStringParameters, APIGatewayEvent } from 'src/utilities/api';

export const deleteTask = async (event: APIGatewayEvent) => {
  try {
    const parameters = getQueryStringParameters(event);
    if (!parameters?.id)
      return { statusCode: 400, message: 'Admin ID is required!' };
    const { id } = parameters;
    await Task.update({ id }, { deleted: true });
    return { message: 'Deleted Task' };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
