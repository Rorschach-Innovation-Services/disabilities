import { Department, Employee, Questionnaire } from '../../models';
import emailSend from '../../utilities/sendEmail';
import {
  getQueryStringParameters,
  APIGatewayEvent,
  assessmentEmailTemplates,
} from '../../utilities/api';
import { Request, Response } from 'express';

export const sendQuestionnaire = async (
  request: Request,
  response: Response,
) => {
  try {
    // const parameters = getQueryStringParameters(event);
    // if (!parameters?.departmentId)
    //   return { statusCode: 400, message: 'Questionnaire ID is required!' };

    const parameters = request.params;
    const { departmentId } = parameters;
    const department = await Department.get({ id: departmentId });
    const questionnaires = await Questionnaire.query(
      { _en: 'questionnaire' },
      { index: 'gsIndex' },
    );
    const secondQuestionnaire = questionnaires.items.find((q) => q.order === 2);
    if (typeof secondQuestionnaire === 'undefined')
      return response.status(500).json({ message: 'Questionnaire not found' });

    const employees = await Employee.query(
      { _en: 'employee' },
      {
        index: 'gsIndex',
        beginsWith: `${department.companyId}:${department.id}`,
      },
    );
    const questionnaireId = secondQuestionnaire.id;
    const companyId = department.companyId;

    const { emailSubject, emailMessage } = assessmentEmailTemplates({
      questionnaireId,
      companyId,
      departmentId,
    });

    // await Promise.all(
    //   employees.items.map((emp) => {
    //     const funct = async (employee: any) => {
    //       if (employee.email.length > 0)
    //         await emailSend(
    //           employee.email,
    //           employee.name,
    //           emailSubject,
    //           emailMessage
    //         );
    //     };
    //     return funct(emp);
    //   })
    // );
    const index = secondQuestionnaire.order;
    const newCompletedQuestionnaires = { [index]: 1 };
    if (index in department.completedQuestionnaires)
      newCompletedQuestionnaires[index] =
        department.completedQuestionnaires[index] + 1;

    await Department.update(
      {
        id: departmentId,
      },
      {
        completedQuestionnaires: {
          ...department.completedQuestionnaires,
          ...newCompletedQuestionnaires,
        },
      },
    );

    return response.status(200).json({
      message: 'Successfully sent questionnaire',
      questionnaireId,
      departmentId,
      companyId,
    });
  } catch (error) {
    console.error('Error sending questionnaire', error);
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { statusCode: 500, message: 'Internal Server Error', test: 'test' };
  }
};
