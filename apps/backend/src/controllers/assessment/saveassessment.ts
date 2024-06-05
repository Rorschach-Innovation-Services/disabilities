/**
 * Save Assessment Controller
 */
import { Assessment, Employee, Company, Department } from '../../models';
import calculatedScore from '../../utilities/score';
import generateReport from '../../utilities/genReport';
import { getRequestBody, APIGatewayEvent } from 'src/utilities/api';

type Parameters = {
  employee: string;
  questionnaire: {
    id: string;
    content: string;
    response: string;
  }[];
  company: string;
  department: string;
};

/**
 * Save Assessment Controller: Score assessment, save then send report to employee
 * @param req
 * @param res
 * @returns
 */
export const saveAssessment = async (event: APIGatewayEvent) => {
  try {
    const requestBody = getRequestBody(event);
    if (!requestBody)
      return { statusCode: 400, message: 'Request Body is required!' };
    const { employee, questionnaire, company, department } = requestBody;
    const assessmentScore = calculatedScore(questionnaire);

    /**Check if the company exists in the database */
    const companyDocument = await Company.get({ id: company });
    if (!companyDocument) {
      return { message: 'Company not found' };
    }

    /**Check if the department exists in the database */
    const departmentDocument = await Department.get({
      id: department,
    });
    if (!departmentDocument) {
      return { message: 'Department not found' };
    }

    /**Check if the employee exists in the database */
    const employeeDoc = await Employee.get({
      id: employee,
    });
    if (!employeeDoc) {
      return { message: 'Employee Not Found!' };
    }

    const assessmentResponse = await Assessment.query(
      { companyId: companyDocument.id },
      { beginsWith: department }
    );
    const assessments = assessmentResponse.items || [];

    /**Limit the number of employee assessments a company needs to complete to not exceed the . */
    if (assessments.length === departmentDocument.employeeSize) {
      return {
        message: 'Cannot Submit Assessment. Limit Exceeded!',
        employee: employeeDoc.id,
      };
    }

    /**Create and save the assessment */
    const assessment = await Assessment.create({
      employeeId: employee,
      questionnaire,
      score: assessmentScore,
      companyId: company,
      departmentId: department,
      deleted: false,
    });
    // const reportRes = await generateReport(assessment);
    // if (typeof reportRes !== 'undefined' && 'error' in reportRes) {
    //   return {
    //     message: 'Something Went Wrong While generating report!',
    //     error: reportRes.error,
    //   };
    // }
    // return { message: 'Successful', data: reportRes };
    return { message: 'Successful' };
  } catch (error) {
    console.log('error', error);
    return { message: 'Internal Server Error', error };
  }
};
