/**
 * Complete Task Controller
 */
import { Task } from '../../models';
import { Request, Response } from 'express';

/**
 * Signin Admin to platform
 */
export default async (request: Request, response: Response) => {
  try {
    const { complete } = request.body;
    const { id } = request.params;
    const task = await Task.get({ id });
    await Task.update({ id }, { complete });
    return response
      .status(200)
      .send({ message: 'Task Complete', task: { ...task, complete } });
  } catch (error) {
    return response.status(500).send({ message: 'Internal Server Error' });
  }
};
