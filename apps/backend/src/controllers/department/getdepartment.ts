import { Department, Assessment, Company } from '../../models';
import { Employee } from '../../models/employee.model';
import { Request, Response } from 'express';
import { getQueryStringParameters, APIGatewayEvent } from '../../utilities/api';

export const getDepartment = async (request: Request, response: Response) => {
  try {
    // const parameters = getQueryStringParameters(event);
    // if (!parameters?.departmentId)
    // return { statusCode: 400, message: 'Admin ID is required!' };
    const parameters = request.params;
    const { departmentId } = parameters;
    const department = await Department.get({ id: departmentId });
    if (!department)
      return response.status(400).json({ message: 'Department Not Found!' });
    // return { message: 'Department not found.' };
    const company = await Company.get({ id: department.companyId });
    if (!company)
      return response.status(400).json({ message: 'Company Not Found!' });
    // return { message: 'Company not found.' };

    const employeesResponse = await Employee.query(
      { _en: 'employee' },
      { index: 'gsIndex', beginsWith: `${company.id}:${department.id}` },
    );
    const employees = (employeesResponse.items || []).filter(
      (item) => item._en === 'employee',
    );
    for (let i = 0; i < employees.length; i++) {
      const assessmentResponse = await Assessment.query(
        {
          companyId: company.id,
        },
        { beginsWith: `${department.id}:${employees[i].id}` },
      );
      const assessments = (assessmentResponse.items || [])
        .filter((item) => item._en === 'assessment')
        .sort((a, b) => Number(b.created) - Number(a.created));
      let assessment: any = undefined;
      if (assessments.length > 0) assessment = assessments[0];

      employees[i] = {
        ...employees[i],
        lastAssessmentDate: assessment ? assessment.created : 'none',
      } as any;
    }

    return response.status(200).json({
      department: {
        ...department,
        employees: employees.filter((employee) => !employee.deleted),
        company,
      },
    });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
