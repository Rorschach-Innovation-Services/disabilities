import { Assessment, Employee } from '../../models/';
import { generateStreamReport } from '../../utilities/genReport';
import { getQueryStringParameters, APIGatewayEvent } from '../../utilities/api';
import { Request, Response } from 'express';

export const createIndividualReport = async (
  request: Request,
  response: Response,
) => {
  try {
    const parameters = request.params;
    // const parameters = getQueryStringParameters(event);
    // if (!parameters?.employeeId)
    //   return { statusCode: 400, message: 'Admin ID is required!' };
    const employee = await Employee.get({ id: parameters.employeeId });

    if (!employee || employee.deleted)
      return response.status(400).json({ message: 'Employee Not Found!' });
    // return { message: "Employee doesn't exist." };

    const assessmentResponse = await Assessment.query(
      {
        companyId: employee.companyId,
      },
      { beginsWith: `${employee.departmentId}:${employee.id}` },
    );

    const assessments = (assessmentResponse.items || []).sort(
      (a, b) => Number(b.created) - Number(a.created),
    );
    let assessment: any = undefined;
    if (!assessments)
      return response
        .status(400)
        .json({ message: 'No assessment exist for employee.' });
    // return { message: 'No assessment exist for employee.' };
    if (assessments.length > 0) assessment = assessments[0];
    const report = await generateStreamReport(assessment, employee);
    response.contentType('application/pdf');
    response.attachment();
    report.pipe(response);
    // return { contentType: 'application/pdf', report };
  } catch (error) {
    console.log('error', error);
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
