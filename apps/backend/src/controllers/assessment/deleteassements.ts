import { Assessment } from '../../models/assessment.model';
import { getRequestBody, APIGatewayEvent } from '../../utilities/api';
import { Request, Response } from 'express';

type Parameters = {
  assessmentDates: {
    companyId: string;
    departmentId: string;
    employeeId: string;
    id: string;
  }[];
};

export const deleteAssessments = async (
  request: Request,
  response: Response,
) => {
  try {
    // const requestBody = getRequestBody(event);
    const requestBody = request.body;
    // if (!requestBody)
    //   return { statusCode: 400, message: 'Request Body is required!' };
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
        },
      );
    }
    return response
      .status(500)
      .json({ message: 'Assessments successfully deleted' });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    return { message: 'Internal Server Error' };
  }
};
