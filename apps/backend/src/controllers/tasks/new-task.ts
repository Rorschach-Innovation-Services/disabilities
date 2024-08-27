/**
 * New Task Controller
 */
import { Administrator, Task } from '../../models';
import { Request, Response } from 'express';
import { getRequestBody, APIGatewayEvent } from '../../utilities/api';

export const saveTask = async (request: Request, response: Response) => {
  try {
    // const requestBody = getRequestBody(event);
    // if (!requestBody)
    //   return { statusCode: 400, message: 'Request Body is required!' };
    const requestBody = request.body;
    const { admin, content, title } = requestBody;
    const adminDoc = await Administrator.get({ id: admin });
    if (!adminDoc)
      return response.status(400).json({ message: 'Admin Not Found!' });
    // return { message: 'Admin not found' };
    const task = await Task.create({
      content,
      title,
      adminId: adminDoc.id,
      deleted: false,
      photo: adminDoc.photo,
      complete: false,
      adminEmail: adminDoc.email,
    });
    return response.status(200).json({ message: 'Created Task', task });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
