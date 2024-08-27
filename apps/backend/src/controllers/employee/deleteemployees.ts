import { Employee } from '../../models/';
import { getRequestBody, APIGatewayEvent } from '../../utilities/api';
import { Request, Response } from 'express';

export const deleteEmployees = async (request: Request, response: Response) => {
  try {
    const requestBody = request.body;
    // const requestBody = getRequestBody(event);
    // if (!requestBody)
    //   return { statusCode: 400, message: 'Request Body is required!' };
    for (const id of requestBody.employees) {
      await Employee.update({ id }, { deleted: true });
    }
    return response
      .status(200)
      .json({ message: 'Employees successfully deleted' });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
