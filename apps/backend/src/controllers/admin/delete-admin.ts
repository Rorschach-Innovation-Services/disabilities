import { Administrator } from '../../models';
import { getQueryStringParameters, APIGatewayEvent } from '../../utilities/api';
import { Request, Response } from 'express';

export const deleteAdmin = async (request: Request, response: Response) => {
  try {
    const parameters = request.params;
    if (!parameters?.id)
      return response.status(400).json({ message: 'Admin ID is required!' });
    // return { statusCode: 400, message: 'Admin ID is required!' };
    const admin = await Administrator.get({ id: parameters.id });
    if (!admin) {
      return response.status(400).json({ message: 'Admin Not Found!' });
      // return { message: 'Admin Not Found!' };
    }
    await Administrator.update({ id: parameters.id }, { deleted: true });
    return response.status(200).json({ message: 'Admin Deleted' });
    // return { message: 'Admin Deleted' };
  } catch (error) {
    console.error('error', error);
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
