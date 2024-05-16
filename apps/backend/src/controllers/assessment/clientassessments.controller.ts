/**
 * Getting the assessments completed by the employees of a specific company grouped together based on date of completion
 */
import { Department, Company, Employee } from '../../models/';
import { Request, Response } from 'express';
import { parseAsync } from 'json2csv';
import {
  csvOptions,
  transformData,
  TransformedResult,
} from '../../utilities/transform';
import { Assessment } from '../../models/assessment.model';
import assert from 'assert';

export const getClientAssessments = async (
  request: Request,
  response: Response
) => {
  try {
    const { companyID } = request.params;
    // Ensure company exists
    const company = await Company.get({ id: companyID });
    if (!company) {
      return response.status(400).json({ message: 'No such company exists' });
    }

    //Find assessments associated to department
    const departmentResponse = await Department.query(
      { companyId: company.id },
      { index: 'gsIndex', limit: 1 }
    );
    const departments = departmentResponse.items || [];
    if (!departments.length) {
      return response
        .status(200)
        .json({ clientName: company.name, departments: [], masterFile: '' });
    }

    const dates: string[] = [];
    departments.forEach(async (department) => {
      const assDates: Date[] = [];
      const assessmentResponse = await Assessment.query(
        {
          companyId: company.id,
        },
        { beginsWith: `${department.id}` }
      );
      const assessments = assessmentResponse.items || [];
      (department as any).assessments = assessments;

      assessments.forEach((assessment) => {
        // if (isAfter(new Date(assessment.created), new Date(date)))
        assDates.push(new Date(assessment.created));
      });
      const latestDate = new Date(
        Math.max(...assDates.map((date: Date) => date.getTime()))
      );
      dates.push(assDates.length === 0 ? 'none' : latestDate.toDateString());
    });

    const responseAssessments: any[] = [];
    const departmentCSVs: string[] = [];
    const masterFileData: TransformedResult[] = [];

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

    return response.status(200).json({
      clientName: company.name,
      departments: responseAssessments.map((department, index) => ({
        ...department.toJSON(),
        lastAssessmentDate: dates[index],
        departmentFile: departmentCSVs[index],
      })),
      masterFile: `SEP=,\n${masterCSVFile}`,
    });
  } catch (error) {
    console.log('error', error);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
