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
import { getQueryStringParameters, APIGatewayEvent } from 'src/utilities/api';

export const getSpreadsheet = async (event: APIGatewayEvent) => {
  try {
    const parameters = getQueryStringParameters(event);
    if (!parameters?.departmentId)
      return { statusCode: 400, message: 'Admin ID is required!' };
    const { departmentId } = parameters;
    //Find assessments associated to department
    const department = await Department.get({ id: departmentId });
    if (!department) {
      return { message: 'Department not found.' };
    }

    let lastAssessmentDate = new Date('December 17, 1995').toString();
    const company = await Company.get({ id: department.companyId });
    if (!company) return { message: 'Company not found.' };

    const assessmentResponse = await Assessment.query(
      {
        companyId: company.id,
      },
      { beginsWith: `${department.id}` }
    );
    const assessments = assessmentResponse.items || [];
    assessments.forEach((assessment) => {
      if (isAfter(new Date(assessment.created), new Date(lastAssessmentDate)))
        lastAssessmentDate = new Date(assessment.created).toString();
    });

    const masterFileData: TransformedResult[] = [];
    const csvData: TransformedResult[] = [];

    for (const assessment of assessments) {
      const employee = await Employee.get({
        id: assessment.employeeId,
      });
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

    return {
      departmentFile: `SEP=,\n${file}`,
      masterFile: `SEP=,\n${masterCSVFile}`,
    };
  } catch (err) {
    return { message: 'Internal server error.' };
  }
};
