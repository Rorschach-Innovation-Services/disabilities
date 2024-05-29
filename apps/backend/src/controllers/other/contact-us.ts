/**
 * Contact Us Controller
 */
import emailSend from '../../utilities/sendEmail';

type Parameters = {
  subject: string;
  message: string;
};

/**
 * Send a contact us email to admin
 * @param request
 * @param response
 * @returns
 */
export const contactUs = ({ subject, message }: Parameters) => {
  try {
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
