/**
 * New Task Controller
 */
import { Administrator, Task } from '../../models';
import { getRequestBody, APIGatewayEvent } from 'src/utilities/api';

export const saveTask = async (event: APIGatewayEvent) => {
  try {
    const requestBody = getRequestBody(event);
    if (!requestBody)
      return { statusCode: 400, message: 'Request Body is required!' };
    const { admin, content, title } = requestBody;
    const adminDoc = await Administrator.get({ id: admin });
    if (!adminDoc) return { message: 'Admin not found' };
    const task = await Task.create({
      content,
      title,
      adminId: adminDoc.id,
      deleted: false,
      photo: adminDoc.photo,
      complete: false,
      adminEmail: adminDoc.email,
    });
    return { message: 'Created Task', task };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
