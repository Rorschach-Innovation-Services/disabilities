/**
 * Responsible for marking a list of departments as deleted but not deleting from db
 *
 * */
import { Department } from '../../models/';
import { getRequestBody, APIGatewayEvent } from '../../utilities/api';
import { Request, Response } from 'express';

export const deleteDepartments = async (
  request: Request,
  response: Response,
) => {
  try {
    // const requestBody = getRequestBody(event);
    const requestBody = request.body;
    // if (!requestBody)
    //   return { statusCode: 400, message: 'Request Body is required!' };
    for (const id of requestBody.departments) {
      await Department.update({ id }, { deleted: true });
    }
    return response
      .status(200)
      .json({ message: 'Departments successfully deleted' });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
