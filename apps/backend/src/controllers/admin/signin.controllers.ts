/**
 * Admin Signin Controller
 */
import { Administrator } from '../../models';
import bcrypt from 'bcrypt';
import { generateToken } from '../../middleware/JWT.middleware';
import { Request, Response } from 'express';

/**
 * Signin Admin to platform
 */
export default async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const adminResponse = await Administrator.query(
      { gspk: 'administrators' },
      { index: 'GSI1', limit: 1 }
    );
    const admins = adminResponse.Items;
    if (!admins || admins.length === 0)
      return response
        .status(400)
        .send({ message: 'User does not exist. Please Request Registration' });
    const admin = admins[0];

    if (!admin) {
      return response
        .status(400)
        .send({ message: 'User does not exist. Please Request Registration' });
    } else {
      if (admin.deleted)
        return response.status(400).send({
          message: 'User does no longer exist. Please Request Registration',
        });
      const verified = await bcrypt.compare(password, admin.password || '');
      if (!verified) {
        return response
          .status(400)
          .send({ message: 'Incorrect Email/Password' });
      }
      const token = generateToken({ email, role: 'admin' });
      admin.password = '';
      return response
        .status(200)
        .send({ message: 'Successful login', token, admin });
    }
  } catch (error) {
    return response.status(500).send({ message: 'Internal Server Error' });
  }
};
