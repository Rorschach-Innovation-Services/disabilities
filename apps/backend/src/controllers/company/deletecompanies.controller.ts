/**
 * Responsible for marking a list of companies as deleted but not deleting from db
 *
 * */
import { Request, Response } from 'express';
import { Company } from '../../models/company.model';

export const deleteCompanies = async (request: Request, response: Response) => {
  try {
    const { companyIDs } = request.body;
    for (const id of companyIDs) {
      await Company.update({ id, deleted: true });
    }
    response.status(200).json({ message: 'Companies successfully deleted' });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
