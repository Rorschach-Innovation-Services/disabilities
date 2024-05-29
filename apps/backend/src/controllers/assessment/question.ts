/**
 * Controllers for Creating and Sending Platform Questions
 */
import { Question } from '../../models/index';

type CreateQuestionParameters = {
  id: string;
  content: string;
};

/**
 * Create platform questions controller
 */
export const createQuestion = async ({
  id,
  content,
}: CreateQuestionParameters) => {
  try {
    await Question.create({ givenId: id, content, response: '' });
    return { message: 'Question Created' };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};

/**
 * Send Questions to the client
 */
export const sendQuestions = async () => {
  try {
    const questionsResponse = await Question.query(
      { _en: 'question' },
      { index: 'gsIndex' }
    );
    const questions = questionsResponse.items || [];
    if (questions) {
      return { questions };
    }
    return { message: 'Questions Not Found!' };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
