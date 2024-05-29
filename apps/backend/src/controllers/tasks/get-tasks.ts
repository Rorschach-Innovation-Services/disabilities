/**
 * Get Tasks Controller
 */
import { Task } from '../../models';
import { Request, Response } from 'express';

/**
 * Signin Admin to platform
 */
export default async (request: Request, response: Response) => {
  try {
    const tasksResponse = await Task.query(
      { _en: 'task' },
      { index: 'gsIndex' }
    );
    const tasks = tasksResponse.items;
    if (!tasks) return response.status(400).send({ message: 'No Tasks' });
    return response.status(200).send({ message: 'Successful', tasks });
  } catch (error) {
    return response.status(500).send({ message: 'Internal Server Error' });
  }
};
