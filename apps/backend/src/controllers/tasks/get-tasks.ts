/**
 * Get Tasks Controller
 */
import { Task } from '../../models';

export const getTasks = async () => {
  try {
    const tasksResponse = await Task.query(
      { _en: 'task' },
      { index: 'gsIndex' }
    );
    const tasks = tasksResponse.items;
    if (!tasks) return { message: 'No Tasks' };
    return { message: 'Successful', tasks };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
