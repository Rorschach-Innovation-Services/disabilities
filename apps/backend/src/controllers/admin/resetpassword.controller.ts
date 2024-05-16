/**
 * Admin Reset Password Controller
 */
import { Request, Response } from 'express';
import { genSaltSync, hashSync } from 'bcrypt';
import { Administrator } from '../../models';

export default async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { password } = request.body;
    const saltRounds = 10;
    const adminResponse = await Administrator.get({ id });
    const admin = adminResponse;
    if (!admin) {
      return response.status(404).json({ message: 'Admin Not Found!' });
    }
    const salt = genSaltSync(saltRounds);
    const hash = hashSync(password, salt);
    await Administrator.update({ id }, { password: hash });
    return response.status(200).json({ message: 'Password Updated' });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
