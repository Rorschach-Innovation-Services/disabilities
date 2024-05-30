import { Employee, Assessment } from '../../models';
import { getQueryStringParameters, APIGatewayEvent } from 'src/utilities/api';

export const getEmployee = async (event: APIGatewayEvent) => {
  try {
    const parameters = getQueryStringParameters(event);
    if (!parameters?.id)
      return { statusCode: 400, message: 'Admin ID is required!' };
    const { id } = parameters;
    const employee = await Employee.get({ id });

    if (!employee || employee.deleted)
      return { message: "Employee doesn't exist." };

    const assessmentResponse = await Assessment.query(
      {
        companyId: employee.companyId,
      },
      { beginsWith: `${employee.departmentId}:${employee.id}` }
    );
    const assessment = assessmentResponse.items || [];
    return {
      employee: { ...employee, assessment: assessment ? assessment : null },
    };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
