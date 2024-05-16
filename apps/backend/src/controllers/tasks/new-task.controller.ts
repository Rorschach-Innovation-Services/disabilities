/**
 * New Task Controller
 */
import { Administrator, Task } from '../../models';
import { Request, Response } from 'express';

/**
 * Signin Admin to platform
 */
export default async (request: Request, response: Response) => {
  try {
    const { admin, content, title } = request.body;
    const adminDoc = await Administrator.get({ id: admin });
    if (!adminDoc)
      return response.status(400).send({ message: 'Admin not found' });
    const task = await Task.create({
      content,
      title,
      adminId: adminDoc.id,
      deleted: false,
      photo: adminDoc.photo,
      complete: false,
      adminEmail: adminDoc.email,
    });
    return response.status(200).send({ message: 'Created Task', task });
  } catch (error) {
    return response.status(500).send({ message: 'Internal Server Error' });
  }
};
