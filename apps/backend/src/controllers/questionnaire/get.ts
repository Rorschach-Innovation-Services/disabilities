import { Questionnaire } from '../../models';
import { getQueryStringParameters, APIGatewayEvent } from 'src/utilities/api';

export const getQuestionnaire = async (event: APIGatewayEvent) => {
  try {
    const parameters = getQueryStringParameters(event);
    if (!parameters?.id)
      return { statusCode: 400, message: 'Questionnaire ID is required!' };
    const { id } = parameters;
    const questionnaire = await Questionnaire.get({ id });
    return { message: 'Successfully got questionnaire', questionnaire };
  } catch (error) {
    return { statusCode: 500, message: 'Internal Server Error' };
  }
};
