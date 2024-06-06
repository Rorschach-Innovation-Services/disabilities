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
    const { employeeEmail, questionnaire, company, department } = requestBody;

    /**Check if the company exists in the database */
    const companyDocument = await Company.get({ id: company });
    if (!companyDocument) {
      return { statusCode: 400, message: 'Company not found' };
    }

    /**Check if the department exists in the database */
    const departmentDocument = await Department.get({
      id: department,
    });
    if (!departmentDocument) {
      return { statusCode: 400, message: 'Department not found' };
    }

    /**Check if the employee exists in the database */
    const employeesResponse = await Employee.query(
      {
        _en: 'employee',
      },
      { beginsWith: `${company}:${department}` }
    );
    const employees = employeesResponse.items || [];

    let employeeFound = null;
    let employeeExists = false;
    for (const employee of employees) {
      if (employee.email === employeeEmail) {
        employeeExists = true;
        employeeFound = employee;
        break;
      }
    }

    /**Limit the number of employee assessments a company needs to complete to not exceed the . */
    if (employees.length === departmentDocument.employeeSize) {
      return {
        statusCode: 400,
        message: 'Cannot Submit Assessment. Limit Exceeded!',
        employee: employeeEmail,
      };
    }

    if (!employeeExists) {
      const createdEmployee = await Employee.create({
        name: employeeEmail,
        email: employeeEmail,
        companyId: company,
        departmentId: department,
        deleted: false,
      });
      employeeFound = createdEmployee;
    }

    /**Create and save the assessment */
    const assessment = await Assessment.create({
      employeeId: employeeFound.id,
      questionnaire,
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
