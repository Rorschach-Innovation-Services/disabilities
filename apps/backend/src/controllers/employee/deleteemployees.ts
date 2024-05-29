import { Employee } from '../../models/';

export const deleteEmployees = async (employees: string[]) => {
  try {
    for (const id of employees) {
      await Employee.update({ id }, { deleted: true });
    }
    return { message: 'Employees successfully deleted' };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
