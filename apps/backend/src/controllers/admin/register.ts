import { Administrator } from '../../models';
import sendEmail from '../../utilities/sendEmail';

type Parameters = {
  name: string;
  email: string;
};

export const handler = async ({ name, email }: Parameters) => {
  try {
    const admin = await Administrator.create({
      email,
      name,
      password: '',
      deleted: false,
      bio: '',
      role: 'admin',
      photo: '',
      companyId: '',
      location: '',
      secondaryEmail: '',
    });

    const subject = 'Welcome To Sleep Science Platform';
    const message = `Thank you for registering to the platform. Please create your password by following the link:\nhttp://ec2-13-246-63-101.af-south-1.compute.amazonaws.com:9000/create-password/${admin?.id}`;
    const emailPromise = await sendEmail(email, name, subject, message);

    return { message: 'Registration Successful', data: emailPromise };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
