/**
 * Get Tasks Controller
 */
import { Task } from '../../models';
import { Request, Response } from 'express';

export const getTasks = async (request: Request, response: Response) => {
  try {
    const tasksResponse = await Task.query(
      { _en: 'task' },
      { index: 'gsIndex' },
    );
    const tasks = tasksResponse.items;
    return response.status(200).json({ message: 'Successful', tasks });
    // return { message: 'Successful', tasks };
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
