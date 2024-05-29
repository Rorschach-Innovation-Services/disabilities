/**
 * New Task Controller
 */
import { Administrator, Task } from '../../models';

type Parameters = {
  admin: string;
  content: string;
  title: string;
};

export const handler = async ({ admin, content, title }: Parameters) => {
  try {
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
