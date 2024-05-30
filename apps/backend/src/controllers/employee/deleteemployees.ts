import { Employee } from '../../models/';
import { getRequestBody, APIGatewayEvent } from 'src/utilities/api';

export const deleteEmployees = async (event: APIGatewayEvent) => {
  try {
    const requestBody = getRequestBody(event);
    if (!requestBody)
      return { statusCode: 400, message: 'Request Body is required!' };
    for (const id of requestBody.employees) {
      await Employee.update({ id }, { deleted: true });
    }
    return { message: 'Employees successfully deleted' };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
