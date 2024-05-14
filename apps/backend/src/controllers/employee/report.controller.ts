import { Request, Response } from 'express';
import { Assessment, Employee } from '../../models/';
import { generateStreamReport } from '../../utilities/genReport';
import scoreSleepHealth from '../../utilities/score';

export const createIndividualReport = async (
  request: Request,
  response: Response
) => {
  try {
    const { employeeId } = request.params;
    const employeeResponse = await Employee.get({ id: employeeId });
    const employee = employeeResponse.Item;

    if (!employee || employee.deleted)
      return response.status(400).json({ message: "Employee doesn't exist." });

    const assessmentResponse = await Assessment.query(
      {
        companyId: employee.companyId,
      },
      { beginsWith: `${employee.departmentId}#${employee.id}` }
    );

    const assessments = (assessmentResponse.Items || []).sort(
      (a, b) => Number(b.created) - Number(a.created)
    );
    let assessment: any = undefined;
    if (!assessments)
      return response
        .status(400)
        .json({ message: 'No assessment exist for employee.' });
    if (assessments.length > 0) assessment = assessments[0];
    const assessmentScore = scoreSleepHealth(assessment);
    assessment.score = assessmentScore;
    const report = await generateStreamReport(assessment, employee);
    response.contentType('application/pdf');
    response.attachment();
    report.pipe(response);
  } catch (error) {
    console.log('error', error);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
