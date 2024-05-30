import sendEmail from '../../utilities/sendEmail';

type Parameters = {
  email: string;
  link: string;
};

export const sendLink = async ({ email, link }: Parameters) => {
  try {
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
