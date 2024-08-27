import { Questionnaire } from '../../models';
import { getQueryStringParameters, APIGatewayEvent } from '../../utilities/api';
import { Request, Response } from 'express';

export const getQuestionnaire = async (
  request: Request,
  response: Response,
) => {
  try {
    // const parameters = getQueryStringParameters(event);
    // if (!parameters?.id)
    //   return { statusCode: 400, message: 'Questionnaire ID is required!' };
    const parameters = request.params;
    const { id } = parameters;
    const questionnaire = await Questionnaire.get({ id });
    return response
      .status(200)
      .json({ message: 'Successfully got questionnaire', questionnaire });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { statusCode: 500, message: 'Internal Server Error' };
  }
};
