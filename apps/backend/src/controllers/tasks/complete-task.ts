/**
 * Complete Task Controller
 */
import { Task } from '../../models';
import {
  getQueryStringParameters,
  getRequestBody,
  APIGatewayEvent,
} from '../../utilities/api';
import { Request, Response } from 'express';

export const completeTask = async (request: Request, response: Response) => {
  try {
    // const parameters = getQueryStringParameters(event);
    // const requestBody = getRequestBody(event);
    // if (!requestBody)
    //   return { statusCode: 400, message: 'Request Body is required!' };
    // if (!parameters?.id)
    //   return { statusCode: 400, message: 'Admin ID is required!' };
    const requestBody = request.body;
    const parameters = request.params;
    const { id } = parameters;
    const { complete } = requestBody;
    const task = await Task.get({ id });
    await Task.update({ id }, { complete });
    return response
      .status(200)
      .json({ message: 'Task Complete', task: { ...task, complete } });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
