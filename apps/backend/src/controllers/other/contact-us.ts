/**
 * Contact Us Controller
 */
import emailSend from '../../utilities/sendEmail';
import { getRequestBody, APIGatewayEvent } from 'src/utilities/api';

/**
 * Send a contact us email to admin
 * @param request
 * @param response
 * @returns
 */
export const contactUs = (event: APIGatewayEvent) => {
  try {
    const requestBody = getRequestBody(event);
    if (!requestBody)
      return { statusCode: 400, message: 'Request Body is required!' };
    const { subject, message } = requestBody;
    return emailSend('info@sleepscience.co.za', 'Admin', subject, message)
      .then((res) => {
        return { message: 'Sent email successfully!' };
      })
      .catch((error) => {
        return { message: 'Something Went Wrong!' };
      });
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
