/**
 * Contact Us Controller
 */
import emailSend from '../../utilities/sendEmail';
import { getRequestBody, APIGatewayEvent } from '../../utilities/api';
import { Request, Response } from 'express';

/**
 * Send a contact us email to admin
 * @param request
 * @param response
 * @returns
 */
export const contactUs = (request: Request, response: Response) => {
  try {
    // const requestBody = getRequestBody(event);
    // if (!requestBody)
    //   return { statusCode: 400, message: 'Request Body is required!' };
    const requestBody = request.body;
    const { subject, message } = requestBody;
    return emailSend('info@sleepscience.co.za', 'Admin', subject, message)
      .then((res) => {
        return response
          .status(200)
          .json({ message: 'Sent email successfully!' });
      })
      .catch((error) => {
        return response.status(500).json({ message: 'Internal Server Error' });
        // return { message: 'Something Went Wrong!' };
      });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
