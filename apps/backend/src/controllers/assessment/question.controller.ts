/**
 * Controllers for Creating and Sending Platform Questions
 */
import { Question } from '../../models/index';
import { Request, Response } from 'express';

/**
 * Create platform questions controller
 */
export const createQuestion = async (request: Request, response: Response) => {
  try {
    const { id, content } = request.body;
    await Question.create({ givenId: id, content, response: '' });
    return response.status(200).json({ message: 'Question Created' });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Send Questions to the client
 */
export const sendQuestions = async (request: Request, response: Response) => {
  try {
    const questionsResponse = await Question.query(
      { _en: 'question' },
      { index: 'gsIndex' }
    );
    const questions = questionsResponse.items || [];
    if (questions) {
      return response.status(200).json({ questions });
    }
    return response.status(404).json({ message: 'Questions Not Found!' });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
