/**
 * Admin Reset Password Controller
 */
import { Request, Response } from 'express';
import { Administrator } from '../../models';

export default async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const admin = await Administrator.get({ id });
    if (!admin) {
      return response.status(400).json({ message: 'Admin Not Found!' });
    }
    await Administrator.update({ email: id, deleted: true });
    return response.status(200).json({ message: 'Admin Deleted' });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
