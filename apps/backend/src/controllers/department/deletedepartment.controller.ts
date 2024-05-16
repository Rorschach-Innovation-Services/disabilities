/**
 * Responsible for marking a list of departments as deleted but not deleting from db
 *
 * */
import { Request, Response } from 'express';
import { Department } from '../../models/';

export const deleteDepartments = async (
  request: Request,
  response: Response
) => {
  try {
    const { departments } = request.body;
    for (const id of departments) {
      await Department.update({ id }, { deleted: true });
    }
    return response
      .status(200)
      .json({ message: 'Departments successfully deleted' });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
