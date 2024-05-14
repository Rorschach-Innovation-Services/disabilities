/**
 * Admin Register Controller
 */
import { Administrator } from '../../models';
import { Request, Response } from 'express';
import sendEmail from '../../utilities/sendEmail';
import { v4 } from 'uuid';

/**
 * Register Admin to platform
 */
export default async (request: Request, response: Response) => {
  try {
    const { name, email } = request.body;
    const id = v4();
    await Administrator.put({
      id,
      email,
      name,
      password: '',
      deleted: false,
      bio: '',
      role: 'admin',
      photo: '',
      company: '',
      location: '',
      secondaryEmail: '',
    });

    const subject = 'Welcome To Sleep Science Platform';
    const message = `Thank you for registering to the platform. Please create your password by following the link:\nhttp://ec2-13-246-63-101.af-south-1.compute.amazonaws.com:9000/create-password/${id}`;
    const emailPromise = await sendEmail(email, name, subject, message);

    return response
      .status(200)
      .json({ message: 'Registration Successful', data: emailPromise });
  } catch (error) {
    return response.status(500).send({ message: 'Internal Server Error' });
  }
};
