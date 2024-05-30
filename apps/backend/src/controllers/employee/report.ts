import { Assessment, Employee } from '../../models/';
import { generateStreamReport } from '../../utilities/genReport';
import scoreSleepHealth from '../../utilities/score';
import { getQueryStringParameters, APIGatewayEvent } from 'src/utilities/api';

export const createIndividualReport = async (event: APIGatewayEvent) => {
  try {
    const parameters = getQueryStringParameters(event);
    if (!parameters?.employeeId)
      return { statusCode: 400, message: 'Admin ID is required!' };
    const employee = await Employee.get({ id: parameters.employeeId });

    if (!employee || employee.deleted)
      return { message: "Employee doesn't exist." };

    const assessmentResponse = await Assessment.query(
      {
        companyId: employee.companyId,
      },
      { beginsWith: `${employee.departmentId}:${employee.id}` }
    );

    const assessments = (assessmentResponse.items || []).sort(
      (a, b) => Number(b.created) - Number(a.created)
    );
    let assessment: any = undefined;
    if (!assessments) return { message: 'No assessment exist for employee.' };
    if (assessments.length > 0) assessment = assessments[0];
    const assessmentScore = scoreSleepHealth(assessment);
    assessment.score = assessmentScore;
    const report = await generateStreamReport(assessment, employee);
    return { contentType: 'application/pdf', report };
  } catch (error) {
    console.log('error', error);
    return { message: 'Internal Server Error' };
  }
};
