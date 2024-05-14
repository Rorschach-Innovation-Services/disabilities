/**
 * Get a companies consulted by an admin
 */
import { Company } from '../../models';
import { Request, Response } from 'express';

export default async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const body = request.body;
    const companyResponse = await Company.get({ id });
    const company = companyResponse.Item;
    await Company.update({ id, ...body });
    if (!company || company.deleted) {
      return response.status(400).json({ message: 'Company Not Found' });
    }
    return response
      .status(200)
      .json({ message: 'Updated successfully.', company });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

