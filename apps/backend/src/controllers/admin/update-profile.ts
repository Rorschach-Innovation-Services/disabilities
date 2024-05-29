import { Administrator } from '../../models';

type Parameters = {
  id: string;
  name: string;
  email: string;
  location: string;
  company: string;
  role: string;
  bio: string;
};

export const handler = async ({
  email,
  id,
  bio,
  role,
  company,
  location,
  name,
}: Parameters) => {
  try {
    const admin = await Administrator.get({ id });
    if (!admin) {
      return { message: 'Admin Not Found!' };
    }
    const updatedAdmin = await Administrator.update(
      { id },
      {
        email,
        name,
        location,
        companyId: company,
        role,
        bio,
      }
    );
    updatedAdmin.password = '';
    return { admin: updatedAdmin };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
