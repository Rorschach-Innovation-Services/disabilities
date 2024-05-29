import { Administrator } from '../../models';

type Parameters = {
  id: string;
  email: string;
  secondaryEmail: string;
};

export const handler = async ({ id, email, secondaryEmail }: Parameters) => {
  try {
    const admin = await Administrator.get({ id });
    if (!admin) {
      return { message: 'Admin Not Found!' };
    }
    const updatedAdmin = await Administrator.update(
      { id },
      { email, secondaryEmail }
    );
    updatedAdmin.password = '';
    return { admin: updatedAdmin };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
