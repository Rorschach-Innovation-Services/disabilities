import { Administrator } from '../../models';

type Parameters = {
  id: string;
  photo: string;
};

export const updatePhoto = async ({ id, photo }: Parameters) => {
  try {
    const admin = await Administrator.get({ id });
    if (!admin) {
      return { message: 'Admin Not Found!' };
    }
    await Administrator.update({ id }, { photo });
    return { photo };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
