/**
 * Responsible for marking a list of departments as deleted but not deleting from db
 *
 * */
import { Department } from '../../models/';

export const deleteDepartments = async (departments: string[]) => {
  try {
    for (const id of departments) {
      await Department.update({ id }, { deleted: true });
    }
    return { message: 'Departments successfully deleted' };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
