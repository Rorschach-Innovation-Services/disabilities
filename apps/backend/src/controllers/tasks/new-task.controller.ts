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
    const task: Record<string, any> = {
      content,
      title,
      adminId: admin,
    };
    Task.put(task as any);
    const adminDocResponse = await Administrator.get({ id: admin });
    const adminDoc = adminDocResponse.Item;
    if (!adminDoc)
      return response.status(400).send({ message: 'Admin not found' });
    task.admin = adminDoc.name;
    task.photo = adminDoc.photo;
    task.adminId = adminDoc.id;
    return response.status(200).send({ message: 'Created Task', task });
  } catch (error) {
    return response.status(500).send({ message: 'Internal Server Error' });
  }
};

