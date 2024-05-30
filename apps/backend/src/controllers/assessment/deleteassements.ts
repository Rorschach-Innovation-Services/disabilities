import { Assessment } from '../../models/assessment.model';
import { getRequestBody, APIGatewayEvent } from 'src/utilities/api';

type Parameters = {
  assessmentDates: {
    companyId: string;
    departmentId: string;
    employeeId: string;
    id: string;
  }[];
};

export const deleteAssessments = async (event: APIGatewayEvent) => {
  try {
    const requestBody = getRequestBody(event);
    if (!requestBody)
      return { statusCode: 400, message: 'Request Body is required!' };
    for (const data of requestBody.assessmentDates) {
      await Assessment.update(
        {
          companyId: data.companyId,
          departmentId: data.departmentId,
          employeeId: data.employeeId,
          id: data.id,
        },
        {
          deleted: true,
        }
      );
    }
    return { message: 'Assessments successfully deleted' };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
