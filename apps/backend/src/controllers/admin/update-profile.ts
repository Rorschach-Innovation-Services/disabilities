/**
 * Admin Reset Password Controller
 */
import { Request, Response } from 'express';
import { Administrator } from '../../models';

export default async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { name, email, location, company, role, bio } = request.body;
    const admin = await Administrator.get({ id });
    if (!admin) {
      return response.status(400).json({ message: 'Admin Not Found!' });
    }
    const updatedAdmin = await Administrator.update(
      { id },
      {
        email,
        name,
        location,
        companyId: company,
        role,
        bio,
      }
    );
    updatedAdmin.password = '';
    return response.status(200).json({ admin: updatedAdmin });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
