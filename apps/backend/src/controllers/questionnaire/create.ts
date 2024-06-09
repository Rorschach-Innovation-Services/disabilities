import { Administrator, Questionnaire } from '../../models';
import { getRequestBody, APIGatewayEvent } from 'src/utilities/api';

export const createQuestionnaire = async (event: APIGatewayEvent) => {
  try {
    const requestBody = getRequestBody(event);
    if (!requestBody)
      return { statusCode: 400, message: 'Request Body is required!' };
    const { admin, name, questions } = requestBody;
    const adminDoc = await Administrator.get({ id: admin });
    if (!adminDoc) return { statusCode: 400, message: 'Admin not found' };
    const responses = await Questionnaire.query(
      { _en: 'questionnaire' },
      { index: 'gsIndex' }
    );
    const questionnaire = await Questionnaire.create({
      creator: {
        id: adminDoc.id,
        name: adminDoc.name,
      },
      name,
      order: (responses.items.filter((item) => !item.deleted).length || 0) + 1,
      questions,
      deleted: false,
    });
    return { message: 'Created Questionnaire', questionnaire };
  } catch (error) {
    return { statusCode: 500, message: 'Internal Server Error' };
  }
};
