/**
 * Admin Reset Password Controller
 */
import { Request, Response } from 'express';
import { Administrator } from '../../models';

export default async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { name, email, location, company, role, bio } = request.body;
    const adminResponse = await Administrator.get({ id });
    const admin = adminResponse.Item;
    if (!admin) {
      return response.status(400).json({ message: 'Admin Not Found!' });
    }
    await Administrator.update({
      id,
      email,
      name,
      location,
      company,
      role,
      bio,
    });
    admin.password = '';
    return response.status(200).json({ admin });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
