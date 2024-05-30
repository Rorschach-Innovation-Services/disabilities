import { Assessment, Department, Employee } from '../../models';
import {
  getQueryStringParameters,
  getRequestBody,
  APIGatewayEvent,
} from 'src/utilities/api';

export const updateEmployee = async (event: APIGatewayEvent) => {
  try {
    const parameters = getQueryStringParameters(event);
    const requestBody = getRequestBody(event);
    if (!requestBody)
      return { statusCode: 400, message: 'Request Body is required!' };
    if (!parameters?.id)
      return { statusCode: 400, message: 'Admin ID is required!' };
    const { id } = parameters;
    const { departmentId, age, email, name, questionnaire, gender, idNumber } =
      requestBody;
    const employee = await Employee.get({ id });
    const department = await Department.get({ id: departmentId });

    if (!employee) return { message: 'Employee not found.' };
    if (!department) return { message: 'Department not found.' };

    const assessmentResponse = await Assessment.query(
      { companyId: department.companyId },
      { beginsWith: department.id }
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
        id_number: idNumber,
        age,
        gender,
      }
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
        }
      );
    }

    return { message: 'Successfully updated.' };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
