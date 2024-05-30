import sendEmail from '../../utilities/sendEmail';
import { getRequestBody, APIGatewayEvent } from 'src/utilities/api';

export const sendLink = async (event: APIGatewayEvent) => {
  try {
    const requestBody = getRequestBody(event);
    if (!requestBody)
      return { statusCode: 400, message: 'Request Body is required!' };
    const { email, link } = requestBody;
    const emailPromise = sendEmail(
      email,
      'There',
      'Sleep Science Questionnaire Link',
      `Please click on the link to access the questionnaire: ${link}`
    );
    return emailPromise
      .then((data: any) => {
        return { message: 'Link Sent', data };
      })
      .catch((error: any) => {
        return { error: error };
      });
  } catch (error: unknown) {
    return { message: 'Internal Server Error' };
  }
};
