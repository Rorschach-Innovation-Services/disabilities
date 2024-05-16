/**
 * Delete Task Controller
 */
import { Task } from '../../models';
import { Request, Response } from 'express';

/**
 * Signin Admin to platform
 */
export default async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    await Task.update({ id }, { deleted: true });
    return response.status(200).send({ message: 'Deleted Task' });
  } catch (error) {
    return response.status(500).send({ message: 'Internal Server Error' });
  }
};
