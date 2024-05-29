import { Administrator } from '../../models';
import bcrypt from 'bcrypt';
import { generateToken } from '../../middleware/JWT';

type Parameters = {
  email: string;
  password: string;
};

export const handler = async ({ email, password }: Parameters) => {
  try {
    const adminResponse = await Administrator.query(
      { _en: 'administrator' },
      { index: 'gsIndex', limit: 1 }
    );
    const admins = adminResponse.items;
    if (!admins || admins.length === 0)
      return { message: 'User does not exist. Please Request Registration' };
    const admin = admins[0];

    if (!admin) {
      return { message: 'User does not exist. Please Request Registration' };
    } else {
      if (admin.deleted)
        return {
          message: 'User does no longer exist. Please Request Registration',
        };
      const verified = await bcrypt.compare(password, admin.password || '');
      if (!verified) {
        return { message: 'Incorrect Email/Password' };
      }
      const token = generateToken({ email, role: 'admin' });
      admin.password = '';
      return { message: 'Successful login', token, admin };
    }
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
