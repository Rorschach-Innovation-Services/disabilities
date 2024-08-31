import { Administrator } from '../../models';
import sendEmail from '../../utilities/sendEmail';
import { getRequestBody, APIGatewayEvent } from '../../utilities/api';
import { Request, Response } from 'express';

export const register = async (request: Request, response: Response) => {
  try {
    // const requestBody = getRequestBody(event);
    // if (!requestBody)
    //   return { statusCode: 400, message: 'Request Body is required!' };
    // const { email, name } = requestBody;
    const { name, email } = request.body;
    const admin = await Administrator.create({
      email: email.toLowerCase(),
      name,
      password: '',
      deleted: false,
      bio: '',
      role: 'administrator',
      photo: '',
      companyId: '',
      location: '',
      secondaryEmail: '',
    });

    const subject = 'Welcome To Sleep Science Platform';
    const message = `Thank you for registering to the platform. Please create your password by following the link:\nhttp://ec2-13-246-63-101.af-south-1.compute.amazonaws.com:9000/create-password/${admin?.id}`;
    const emailPromise = await sendEmail(
      email.toLowerCase(),
      name,
      subject,
      message,
    );
    return response
      .status(200)
      .json({ message: 'Registration Successful', data: emailPromise });
    // return { message: 'Registration Successful', data: emailPromise };
  } catch (error) {
    return response.status(500).send({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
