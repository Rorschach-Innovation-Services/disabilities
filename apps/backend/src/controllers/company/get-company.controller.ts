/**
 * Get a companies consulted by an admin
 */
import { Company, Administrator } from '../../models';
import { Request, Response } from 'express';

export default async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const company = await Company.get({ id });
    if (!company || company.deleted) {
      return response.status(400).json({ message: 'Company Not Found' });
    }
    const admin = await Administrator.get({
      id: company.adminId,
    });
    if (!admin) {
      return response.status(400).json({ company, message: 'Admin not found' });
    }
    return response.status(200).json({ company, admin: admin.name });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
