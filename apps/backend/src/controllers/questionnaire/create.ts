import { Administrator, Questionnaire } from '../../models';
import { getRequestBody, APIGatewayEvent } from '../../utilities/api';
import { Request, Response } from 'express';

export const createQuestionnaire = async (
  request: Request,
  response: Response,
) => {
  try {
    // const requestBody = getRequestBody(event);
    // if (!requestBody)
    //   return { statusCode: 400, message: 'Request Body is required!' };
    const requestBody = request.body;
    const { admin, name, questions } = requestBody;
    const adminDoc = await Administrator.get({ id: admin });
    if (!adminDoc)
      return response.status(400).json({ message: 'Admin Not Found!' });
    // return { statusCode: 400, message: 'Admin not found' };
    const responses = await Questionnaire.query(
      { _en: 'questionnaire' },
      { index: 'gsIndex' },
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
    return response
      .status(200)
      .json({ message: 'Created Questionnaire', questionnaire });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { statusCode: 500, message: 'Internal Server Error' };
  }
};
