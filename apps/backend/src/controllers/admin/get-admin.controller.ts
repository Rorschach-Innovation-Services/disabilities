/**
 * Admin Reset Password Controller
 */
import { Request, Response } from 'express';
import { Administrator } from '../../models';

export default async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const admin = await Administrator.get({ id });
    if (!admin.Item) {
      return response.status(400).json({ message: 'Admin Not Found!' });
    }
    admin.Item.password = '';
    return response.status(200).json({ admin: admin.Item });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
