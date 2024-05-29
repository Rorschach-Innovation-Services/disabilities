/**
 * Delete Task Controller
 */
import { Task } from '../../models';

export const handler = async (id: string) => {
  try {
    await Task.update({ id }, { deleted: true });
    return { message: 'Deleted Task' };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
