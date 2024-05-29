/**
 * Responsible for marking a list of companies as deleted but not deleting from db
 *
 * */
import { Request, Response } from 'express';
import { Company } from '../../models/company.model';

export const deleteCompany = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    await Company.update({ id }, { deleted: true });
    response.status(200).json({ message: 'Company successfully deleted' });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
