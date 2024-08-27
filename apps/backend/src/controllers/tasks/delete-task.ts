/**
 * Delete Task Controller
 */
import { Task } from '../../models';
import { getQueryStringParameters, APIGatewayEvent } from '../../utilities/api';
import { Request, Response } from 'express';

export const deleteTask = async (request: Request, response: Response) => {
  try {
    // const parameters = getQueryStringParameters(event);
    // if (!parameters?.id)
    //   return { statusCode: 400, message: 'Admin ID is required!' };
    const parameters = request.params;
    const { id } = parameters;
    await Task.update({ id }, { deleted: true });
    return response.status(200).json({ message: 'Deleted Task' });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
