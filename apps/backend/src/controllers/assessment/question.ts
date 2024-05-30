import { Question } from '../../models/index';
import { getRequestBody, APIGatewayEvent } from 'src/utilities/api';

/**
 * Create platform questions controller
 */
export const createQuestion = async (event: APIGatewayEvent) => {
  try {
    const requestBody = getRequestBody(event);
    if (!requestBody)
      return { statusCode: 400, message: 'Request Body is required!' };
    const { id, content } = requestBody;
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
