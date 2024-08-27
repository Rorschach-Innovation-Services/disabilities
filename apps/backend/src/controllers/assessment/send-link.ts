import sendEmail from '../../utilities/sendEmail';
import { getRequestBody, APIGatewayEvent } from '../../utilities/api';
import { Request, Response } from 'express';

export const sendLink = async (request: Request, response: Response) => {
  try {
    // const requestBody = getRequestBody(event);
    const requestBody = request.body;
    // if (!requestBody)
    //   return { statusCode: 400, message: 'Request Body is required!' };
    const { email, link } = requestBody;
    const emailPromise = sendEmail(
      email,
      'There',
      'Sleep Science Questionnaire Link',
      `Please click on the link to access the questionnaire: ${link}`,
    );
    return emailPromise
      .then((data: any) => {
        return response.status(200).json({ message: 'Link Sent', data });
      })
      .catch((error: any) => {
        console.error(error);
        return response.status(500).json({ message: 'Internal Server Error' });
        // return { error: error };
      });
  } catch (error: unknown) {
    console.error(error);
    return response.status(500).json({ message: 'Internal Server Error' });
    return { message: 'Internal Server Error' };
  }
};
