import { Administrator } from '../../models';

export const getAdmin = async (id: string) => {
  try {
    const admin = await Administrator.get({ id });
    if (!admin) {
      return { message: 'Admin Not Found!' };
    }
    admin.password = '';
    return { admin };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
