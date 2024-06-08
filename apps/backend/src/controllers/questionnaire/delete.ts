import { Questionnaire } from '../../models';
import { getQueryStringParameters, APIGatewayEvent } from 'src/utilities/api';

export const deleteQuestionnaire = async (event: APIGatewayEvent) => {
  try {
    const parameters = getQueryStringParameters(event);
    if (!parameters?.id)
      return { statusCode: 400, message: 'Questionnaire ID is required!' };
    const { id } = parameters;
    await Questionnaire.update({ id }, { deleted: true });
    return { message: 'Deleted Questionnaire' };
  } catch (error) {
    return { statusCode: 500, message: 'Internal Server Error' };
  }
};
