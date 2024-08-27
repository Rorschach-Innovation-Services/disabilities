import { Assessment, Department, Employee } from '../../models';
import {
  getQueryStringParameters,
  getRequestBody,
  APIGatewayEvent,
} from '../../utilities/api';
import { Request, Response } from 'express';

export const updateEmployee = async (request: Request, response: Response) => {
  try {
    // const parameters = getQueryStringParameters(event);
    // const requestBody = getRequestBody(event);
    // if (!requestBody)
    //   return { statusCode: 400, message: 'Request Body is required!' };
    // if (!parameters?.id)
    //   return { statusCode: 400, message: 'Admin ID is required!' };
    const requestBody = request.body;
    const parameters = request.params;
    const { id } = parameters;
    const { departmentId, age, email, name, questionnaire, gender, idNumber } =
      requestBody;
    const employee = await Employee.get({ id });
    const department = await Department.get({ id: departmentId });

    if (!employee)
      return response.status(400).json({ message: 'Employee Not Found!' });
    // return { message: 'Employee not found.' };
    if (!department)
      return response.status(400).json({ message: 'Department Not Found!' });
    // return { message: 'Department not found.' };

    const assessmentResponse = await Assessment.query(
      { companyId: department.companyId },
      { beginsWith: department.id },
    );
    const assessments = assessmentResponse.items || [];

    let assessment: any = null;
    for (const depAssessment of assessments) {
      if (depAssessment.employeeId === employee.id) assessment = depAssessment;
    }
    await Employee.update(
      { id: employee.id },
      {
        name,
        email,
      },
    );

    if (assessment !== null) {
      await Assessment.update(
        {
          companyId: assessment.companyId,
          employeeId: employee.id,
          departmentId: department.id,
          id: assessment.id,
        },
        {
          questionnaire,
        },
      );
    }

    return response.status(200).json({ message: 'Successfully updated.' });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
