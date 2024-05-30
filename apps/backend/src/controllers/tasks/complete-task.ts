/**
 * Complete Task Controller
 */
import { Task } from '../../models';

export const completeTask = async (id: string, complete: boolean) => {
  try {
    const task = await Task.get({ id });
    await Task.update({ id }, { complete });
    return { message: 'Task Complete', task: { ...task, complete } };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
