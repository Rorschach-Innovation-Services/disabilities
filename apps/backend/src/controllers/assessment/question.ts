import { Question } from '../../models/index';
import { getRequestBody, APIGatewayEvent } from '../../utilities/api';
import { Request, Response } from 'express';

/**
 * Create platform questions controller
 */
export const createQuestion = async (request: Request, response: Response) => {
  try {
    // const requestBody = getRequestBody(event);
    const requestBody = request.body;
    // if (!requestBody)
    //   return { statusCode: 400, message: 'Request Body is required!' };
    const { id, content } = requestBody;
    await Question.create({ givenId: id, content, response: '' });
    // return { message: 'Question Created' };
    return response.status(200).json({ message: 'Question Created' });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};

/**
 * Send Questions to the client
 */
export const sendQuestions = async (request: Request, response: Response) => {
  try {
    const questionsResponse = await Question.query(
      { _en: 'question' },
      { index: 'gsIndex' },
    );
    const questions = questionsResponse.items || [];
    if (questions) {
      return { questions };
    }
    return response.status(200).json({ message: 'Questions Not Found!' });
    // return { message: 'Questions Not Found!' };
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
