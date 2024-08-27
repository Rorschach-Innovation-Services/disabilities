import { Employee, Assessment } from '../../models';
import { getQueryStringParameters, APIGatewayEvent } from '../../utilities/api';
import { Request, Response } from 'express';

export const getEmployee = async (request: Request, response: Response) => {
  try {
    // const parameters = getQueryStringParameters(event);
    // if (!parameters?.id)
    //   return { statusCode: 400, message: 'Admin ID is required!' };
    const parameters = request.params;
    const { id } = parameters;
    const employee = await Employee.get({ id });

    if (!employee || employee.deleted)
      return response.status(400).json({ message: 'Employee Not Found!' });
    // return { message: "Employee doesn't exist." };

    const assessmentResponse = await Assessment.query(
      {
        companyId: employee.companyId,
      },
      { beginsWith: `${employee.departmentId}:${employee.id}` },
    );
    const assessment = assessmentResponse.items || [];
    return response.status(200).json({
      employee: { ...employee, assessment: assessment ? assessment : null },
    });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
