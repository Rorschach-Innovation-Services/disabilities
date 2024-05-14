import { Response, Request } from 'express';
import { parseAsync } from 'json2csv';
import { Department, Employee } from '../../models';
import { Assessment } from '../../models/assessment.model';
import { Company } from '../../models/company.model';
import {
  csvOptions,
  transformData,
  TransformedResult,
} from '../../utilities/transform';
import { isAfter } from 'date-fns';

export const getSpreadsheet = async (request: Request, response: Response) => {
  try {
    const { departmentId } = request.params;

    //Find assessments associated to department
    const departmentResponse = await Department.get({ id: departmentId });
    const department = departmentResponse.Item;
    if (!department) {
      return response.status(400).json({ message: 'Department not found.' });
    }

    let lastAssessmentDate = new Date('December 17, 1995').toString();
    const companyResponse = await Company.get({ id: department.companyId });
    const company = companyResponse.Item;
    if (!company)
      return response.status(400).json({ message: 'Company not found.' });

    const assessmentResponse = await Assessment.query(
      {
        companyId: company.id,
      },
      { beginsWith: `${department.id}` }
    );
    const assessments = assessmentResponse.Items || [];
    assessments.forEach((assessment) => {
      if (isAfter(new Date(assessment.created), new Date(lastAssessmentDate)))
        lastAssessmentDate = assessment.created;
    });

    const masterFileData: TransformedResult[] = [];
    const csvData: TransformedResult[] = [];

    for (const assessment of assessments) {
      const employeeResponse = await Employee.get({
        id: assessment.employeeId,
      });
      const employee = employeeResponse.Item;
      const transformedData = transformData({
        employee,
        assessment: assessment,
        company: company,
      });

      csvData.push(transformedData);
      masterFileData.push(transformedData);
    }

    const file = await parseAsync(csvData, csvOptions);

    const masterCSVFile = await parseAsync(masterFileData, csvOptions);

    return response.status(200).json({
      departmentFile: `SEP=,\n${file}`,
      masterFile: `SEP=,\n${masterCSVFile}`,
    });
  } catch (err) {
    return response.status(500).json({ message: 'Internal server error.' });
  }
};
