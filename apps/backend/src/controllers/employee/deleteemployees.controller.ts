import { Request, Response } from 'express';
import { Employee } from '../../models/';

export const deleteEmployees = async (request: Request, response: Response) => {
  try {
    const { employees } = request.body;
    for (const id of employees) {
      await Employee.update({ id }, { deleted: true });
    }
    return response
      .status(200)
      .json({ message: 'Employees successfully deleted' });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
