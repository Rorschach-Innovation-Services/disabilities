/**
 * Getting the assessments completed by the employees of a specific company grouped together based on date of completion
 */
import { Department, Company, Employee } from '../../models/';
import { parseAsync } from 'json2csv';
import {
  csvOptions,
  transformData,
  TransformedResult,
} from '../../utilities/transform';
import { Assessment } from '../../models/assessment.model';
import assert from 'assert';
import { getQueryStringParameters, APIGatewayEvent } from '../../utilities/api';
import { Request, Response } from 'express';

export const getClientAssessmentsOld = async (
  request: Request,
  response: Response,
) => {
  try {
    // const parameters = getQueryStringParameters(event);
    const parameters = request.params;
    // if (!parameters?.companyID)
    //   return { statusCode: 400, message: 'Admin ID is required!' };
    // Ensure company exists
    console.log('Fetching company');
    const company = await Company.get({ id: parameters.companyID });
    if (!company) {
      return response.status(400).json({ message: 'No such company exists' });
      // return { message: 'No such company exists' };
    }

    //Find assessments associated to department
    console.log('Fetching department');
    const departmentResponse = await Department.query(
      { companyId: company.id },
      { index: 'gsIndex' },
    );
    const departments =
      departmentResponse.items.filter((item) => item._en === 'department') ||
      [];
    if (departments.length === 0) {
      return { clientName: company.name, departments: [], masterFile: '' };
    }

    const dates: string[] = [];
    console.log('Looping through departments', departments);
    for (let i = 0; i < departments.length; i++) {
      const department = departments[i];
      const assDates: Date[] = [];
      console.log('Fetching department assessments');
      const assessmentResponse = await Assessment.query(
        {
          companyId: company.id,
        },
        { beginsWith: `${department.id}` },
      );
      const assessments =
        assessmentResponse.items.filter((item) => item._en === 'assessment') ||
        [];
      departments[i] = { ...departments[i], assessments } as any;
      // departments[index].assessments = assessments;

      assessments.forEach((assessment) => {
        assDates.push(new Date(assessment.created));
      });
      const latestDate = new Date(
        Math.max(...assDates.map((date: Date) => date.getTime())),
      );
      dates.push(assDates.length === 0 ? 'none' : latestDate.toDateString());
    }

    console.log('Done Fetching department assessments');
    const responseAssessments: any[] = [];
    const departmentCSVs: string[] = [];
    const masterFileData: TransformedResult[] = [];

    console.log('Converting departments');
    for (const department of departments) {
      const csvData: TransformedResult[] = [];

      for (const assessment of (department as any).assessments) {
        console.log('fetching employee');
        const employee = await Employee.get({
          id: assessment.employeeId,
        });
        assert(employee !== null);
        console.log('transforming data');
        const transformedDate = transformData({
          employee,
          assessment: assessment,
          company,
        });
        console.log('Finished transforming data');
        csvData.push(transformedDate);
        masterFileData.push(transformedDate);
      }

      console.log('Parse Async');
      const file = await parseAsync(csvData, csvOptions);
      departmentCSVs.push(`SEP=,\n${file}`);
      responseAssessments.push(department);
    }

    console.log('Master Parse Async');
    const masterCSVFile = await parseAsync(masterFileData, csvOptions);

    return response.status(200).json({
      clientName: company.name,
      departments: responseAssessments.map((department, index) => {
        return {
          ...department,
          lastAssessmentDate: dates[index],
          departmentFile: departmentCSVs[index],
        };
      }),
      masterFile: `SEP=,\n${masterCSVFile}`,
    });
  } catch (error) {
    console.log('error', error);
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};

export const getClientAssessments = async (
  request: Request,
  response: Response,
) => {
  try {
    // const parameters = getQueryStringParameters(event);
    const parameters = request.params;
    // if (!parameters?.companyID)
    //   return { statusCode: 400, message: 'Admin ID is required!' };

    // Ensure company exists
    console.log('Fetching company');
    const company = await Company.get({ id: parameters.companyID });
    if (!company) {
      return response.status(400).json({ message: 'No such company exists' });
      // return { message: 'No such company exists' };
    }

    // Fetch departments associated with the company
    console.log('Fetching departments');
    const departmentResponse = await Department.query(
      { companyId: company.id },
      { index: 'gsIndex' },
    );
    const departments = departmentResponse.items.filter(
      (item) => item._en === 'department',
    );
    if (departments.length === 0) {
      return { clientName: company.name, departments: [], masterFile: '' };
    }

    // Fetch all assessments and employees in parallel
    console.log('Fetching assessments for departments');
    const assessmentsPromises = departments.map((department) =>
      Assessment.query(
        { companyId: company.id },
        { beginsWith: `${department.id}` },
      ),
    );
    const assessmentsResponses = await Promise.all(assessmentsPromises);
    const assessmentsByDepartment = assessmentsResponses.map((response) =>
      response.items.filter((item) => item._en === 'assessment'),
    );

    const dates: string[] = [];
    assessmentsByDepartment.forEach((assessments, index) => {
      const assDates = assessments.map(
        (assessment) => new Date(assessment.created),
      );
      const latestDate = new Date(
        Math.max(...assDates.map((date) => date.getTime())),
      );
      dates.push(assDates.length === 0 ? 'none' : latestDate.toDateString());
      departments[index] = { ...departments[index], assessments } as any;
    });

    console.log('Fetching employees and transforming data');
    const responseAssessments: any[] = [];
    const departmentCSVs: string[] = [];
    const masterFileData: TransformedResult[] = [];
    const employeePromises = assessmentsByDepartment
      .flat()
      .map((assessment) => Employee.get({ id: assessment.employeeId }));

    const employees = await Promise.all(employeePromises);
    const employeesById = employees.reduce((acc, employee) => {
      acc[employee.id] = employee;
      return acc;
    }, {});

    for (const department of departments) {
      const csvData: TransformedResult[] = [];
      for (const assessment of (department as any).assessments) {
        const employee = employeesById[assessment.employeeId];
        assert(employee !== null);
        const transformedData = transformData({
          employee,
          assessment: assessment,
          company,
        });
        csvData.push(transformedData);
        masterFileData.push(transformedData);
      }
      const file = await parseAsync(csvData, csvOptions);
      departmentCSVs.push(`SEP=,\n${file}`);
      responseAssessments.push(department);
    }

    const masterCSVFile = await parseAsync(masterFileData, csvOptions);

    return response.status(200).json({
      clientName: company.name,
      departments: responseAssessments.map((department, index) => {
        return {
          ...department,
          lastAssessmentDate: dates[index],
          departmentFile: departmentCSVs[index],
        };
      }),
      masterFile: `SEP=,\n${masterCSVFile}`,
    });
  } catch (error) {
    console.log('error', error);
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
