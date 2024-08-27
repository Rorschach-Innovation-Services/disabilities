import { Questionnaire } from '../../models';
import { Request, Response } from 'express';

export const getQuestionnaires = async (
  request: Request,
  response: Response,
) => {
  try {
    const responseQuery = await Questionnaire.query(
      { _en: 'questionnaire' },
      { index: 'gsIndex' },
    );
    const questionnaires = responseQuery.items.filter((item) => !item.deleted);
    return response.status(200).json({ message: 'Successful', questionnaires });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { stataCode: 500, message: 'Internal Server Error' };
  }
};
