import { genSaltSync, hashSync } from 'bcrypt';
import { Administrator } from '../../models';

type Parameters = {
  id: string;
  password: string;
};

export const handler = async ({ id, password }: Parameters) => {
  try {
    const saltRounds = 10;
    const adminResponse = await Administrator.get({ id });
    const admin = adminResponse;
    if (!admin) {
      return { message: 'Admin Not Found!' };
    }
    const salt = genSaltSync(saltRounds);
    const hash = hashSync(password, salt);
    await Administrator.update({ id }, { password: hash });
    return { message: 'Password Updated' };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
