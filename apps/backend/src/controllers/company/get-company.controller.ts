/**
 * Get a companies consulted by an admin
 */
import { Company, Administrator } from '../../models';
import { Request, Response } from 'express';

export default async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const companyResponse = await Company.get({ id });
    const company = companyResponse.Item;
    if (!company || company.deleted) {
      return response.status(400).json({ message: 'Company Not Found' });
    }
    const adminResponse = await Administrator.get({
      id: company.adminId,
    });
    const admin = adminResponse.Item;
    if (!admin) {
      return response.status(400).json({ company, message: 'Admin not found' });
    }
    return response.status(200).json({ company, admin: admin.name });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
