import { Questionnaire } from '../../models';

export const getQuestionnaires = async () => {
  try {
    const response = await Questionnaire.query(
      { _en: 'questionnaire' },
      { index: 'gsIndex' }
    );
    const questionnaires = response.items.filter((item) => !item.deleted);
    return { message: 'Successful', questionnaires };
  } catch (error) {
    return { stataCode: 500, message: 'Internal Server Error' };
  }
};
