import { Questionnaire } from '../../models';
import {
  getQueryStringParameters,
  getRequestBody,
  APIGatewayEvent,
} from '../../utilities/api';
import { Request, Response } from 'express';

export const updateQuestionnaire = async (
  request: Request,
  response: Response,
) => {
  try {
    // const requestBody = getRequestBody(event);
    // if (!requestBody)
    //   return { statusCode: 400, message: 'Request Body is required!' };
    const requestBody = request.body;
    const { id, name, questions } = requestBody;
    const questionnaire = await Questionnaire.get({ id });
    await Questionnaire.update({ id }, { questions, name });
    return response.status(200).json({
      message: 'Questionnaire updated',
      questionnaire: { ...questionnaire, name, questions },
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { statusCode: 500, message: 'Internal Server Error' };
  }
};
