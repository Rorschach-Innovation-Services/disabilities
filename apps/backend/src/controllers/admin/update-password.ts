import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { Administrator } from '../../models';

type Parameters = {
  id: string;
  password: string;
  newPassword: string;
};

export const handler = async ({ id, password, newPassword }: Parameters) => {
  try {
    const saltRounds = 10;
    const admin = await Administrator.get({ id });
    if (!admin) {
      return { message: 'Admin Not Found!' };
    }
    const verified = compareSync(password, admin.password || '');
    if (!verified) {
      return { message: 'Incorrect Password' };
    }
    const salt = genSaltSync(saltRounds);
    const hash = hashSync(newPassword, salt);
    await Administrator.update({ id }, { password: hash });
    return { message: 'Password Updated' };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
