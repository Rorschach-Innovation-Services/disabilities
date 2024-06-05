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
import { getQueryStringParameters, APIGatewayEvent } from 'src/utilities/api';

export const getClientAssessments = async (event: APIGatewayEvent) => {
  try {
    const parameters = getQueryStringParameters(event);
    if (!parameters?.companyID)
      return { statusCode: 400, message: 'Admin ID is required!' };
    // Ensure company exists
    const company = await Company.get({ id: parameters.companyID });
    if (!company) {
      return { message: 'No such company exists' };
    }

    //Find assessments associated to department
    const departmentResponse = await Department.query(
      { companyId: company.id },
      { index: 'gsIndex', limit: 1 }
    );
    const departments =
      departmentResponse.items.filter((item) => item._en === 'department') ||
      [];
    if (departments.length === 0) {
      return { clientName: company.name, departments: [], masterFile: '' };
    }

    const dates: string[] = [];
    for (let i = 0; i < departments.length; i++) {
      const department = departments[i];
      const assDates: Date[] = [];
      const assessmentResponse = await Assessment.query(
        {
          companyId: company.id,
        },
        { beginsWith: `${department.id}` }
      );
      const assessments =
        assessmentResponse.items.filter((item) => item._en === 'assessment') ||
        [];
      departments[i] = { ...departments[i], assessments };
      // departments[index].assessments = assessments;

      assessments.forEach((assessment) => {
        assDates.push(new Date(assessment.created));
      });
      const latestDate = new Date(
        Math.max(...assDates.map((date: Date) => date.getTime()))
      );
      dates.push(assDates.length === 0 ? 'none' : latestDate.toDateString());
    }
    // departments.forEach(async (department, index) => {
    //   const assDates: Date[] = [];
    //   const assessmentResponse = await Assessment.query(
    //     {
    //       companyId: company.id,
    //     },
    //     { beginsWith: `${department.id}` }
    //   );
    //   const assessments =
    //     assessmentResponse.items.filter((item) => item._en === 'assessment') ||
    //     [];
    //   departments[index] = { ...departments[index], assessments };
    //   // departments[index].assessments = assessments;
    //
    //   assessments.forEach((assessment) => {
    //     assDates.push(new Date(assessment.created));
    //   });
    //   const latestDate = new Date(
    //     Math.max(...assDates.map((date: Date) => date.getTime()))
    //   );
    //   dates.push(assDates.length === 0 ? 'none' : latestDate.toDateString());
    // });

    const responseAssessments: any[] = [];
    const departmentCSVs: string[] = [];
    const masterFileData: TransformedResult[] = [];

    console.log('departments', departments);
    for (const department of departments) {
      const csvData: TransformedResult[] = [];

      for (const assessment of (department as any).assessments) {
        const employee = await Employee.get({
          id: assessment.employeeId,
        });
        assert(employee !== null);
        const transformedDate = transformData({
          employee,
          assessment: assessment,
          company,
        });
        csvData.push(transformedDate);
        masterFileData.push(transformedDate);
      }

      const file = await parseAsync(csvData, csvOptions);
      departmentCSVs.push(`SEP=,\n${file}`);
      responseAssessments.push(department);
    }

    const masterCSVFile = await parseAsync(masterFileData, csvOptions);

    return {
      clientName: company.name,
      departments: responseAssessments.map((department, index) => {
        console.log('typeof department', index, typeof department);
        console.log('department', index, department);
        return {
          ...department,
          lastAssessmentDate: dates[index],
          departmentFile: departmentCSVs[index],
        };
      }),
      masterFile: `SEP=,\n${masterCSVFile}`,
    };
  } catch (error) {
    console.log('error', error);
    return { message: 'Internal Server Error' };
  }
};
