import { Questionnaire } from '../../models';
import {
  getQueryStringParameters,
  getRequestBody,
  APIGatewayEvent,
} from 'src/utilities/api';

export const updateQuestionnaire = async (event: APIGatewayEvent) => {
  try {
    const requestBody = getRequestBody(event);
    if (!requestBody)
      return { statusCode: 400, message: 'Request Body is required!' };
    const { id, name, questions } = requestBody;
    const questionnaire = await Questionnaire.get({ id });
    await Questionnaire.update({ id }, { questions, name });
    return {
      message: 'Questionnaire updated',
      questionnaire: { ...questionnaire, name, questions },
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, message: 'Internal Server Error' };
  }
};
