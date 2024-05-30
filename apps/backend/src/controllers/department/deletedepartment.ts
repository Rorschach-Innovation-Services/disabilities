/**
 * Responsible for marking a list of departments as deleted but not deleting from db
 *
 * */
import { Department } from '../../models/';
import { getRequestBody, APIGatewayEvent } from 'src/utilities/api';

export const deleteDepartments = async (event: APIGatewayEvent) => {
  try {
    const requestBody = getRequestBody(event);
    if (!requestBody)
      return { statusCode: 400, message: 'Request Body is required!' };
    for (const id of requestBody.departments) {
      await Department.update({ id }, { deleted: true });
    }
    return { message: 'Departments successfully deleted' };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
