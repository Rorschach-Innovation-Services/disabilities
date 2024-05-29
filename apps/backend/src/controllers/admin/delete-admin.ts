import { Administrator } from '../../models';

export const handler = async (id: string) => {
  try {
    const admin = await Administrator.get({ id });
    if (!admin) {
      return { message: 'Admin Not Found!' };
    }
    await Administrator.update({ id }, { deleted: true });
    return { message: 'Admin Deleted' };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
