/**
 * Getting client csv files Handlers
 */
import { Assessment, Company, Employee } from '../../models/';
import { parseAsync } from 'json2csv';
import { isAfter } from 'date-fns';
import {
  transformData,
  TransformedResult,
  csvOptions,
} from '../../utilities/transform';

/**
 * Retrieve all client csv files and create master file
 * @param request object
 * @param response object
 * @returns response
 */
export const getClientFiles = async () => {
  try {
    const companyResponse = await Company.query(
      { _en: 'company' },
      { index: 'gsIndex' }
    );
    const companies =
      companyResponse.items.filter((item) => item._en === 'company') || [];
    if (!companies) {
      return { statusCode: 400, message: 'Companies not found' };
    }

    // Holding data to be stored in the master csv file
    const masterFileData: TransformedResult[] = [];
    // Companies that have been modified with attributes
    const modifiedCompanies: any[] = [];

    for (const company of companies) {
      if (company.deleted) continue;
      // Create copy of company to have attributes added to it
      const modifiedCompany: Record<string, any> = {
        ...company,
      };

      const assessmentResponse = await Assessment.query(
        {
          companyId: company.id,
        },
        {}
      );
      const assessments =
        assessmentResponse.items.filter((item) => item._en === 'assessment') ||
        [];

      if (!assessments.length) {
        // Add attributes to the modified company
        modifiedCompany.csvFile = await parseAsync([], csvOptions);
        modifiedCompany.lastAssessmentDate = 'none';
        modifiedCompany.status = 'In Process';
        modifiedCompanies.push(modifiedCompany);
        continue;
      }

      // Holds data to be made in csv for specific client
      const singleClientData: TransformedResult[] = [];
      // Used to obtain the latest questionnaire submitted from a client
      let assessmentDate = assessments[0].created;

      for (const assessment of assessments) {
        if (assessment.deleted) continue;
        const employee = await Employee.get({
          id: assessment.employeeId,
        });

        if (employee) {
          const resultData = transformData({
            employee,
            company,
            assessment,
          });

          singleClientData.push(resultData);
          masterFileData.push(resultData);
          // Update is assessment is newer
          if (isAfter(new Date(assessment.created), new Date(assessmentDate))) {
            assessmentDate = assessment.created;
          }
        }
      }

      const employeesResponse = await Employee.query(
        { _en: 'employee' },
        { index: 'gsIndex', beginsWith: company.id }
      );
      const employees =
        employeesResponse.items.filter((item) => item._en === 'employee') || [];
      const clientCSVFile = await parseAsync(singleClientData, csvOptions);
      modifiedCompany.csvFile = `SEP=,\n${clientCSVFile}`;
      modifiedCompany.lastAssessmentDate = assessmentDate;
      modifiedCompany.status =
        employees.length === company.employeeSize ? 'Complete' : 'In Process';

      modifiedCompanies.push(modifiedCompany);
    }

    // Create master file
    const masterCSVFile = await parseAsync(masterFileData, csvOptions);

    const sortedCompanyList = modifiedCompanies.sort((x, y) => {
      return Number(y.created) - Number(x.created);
    });
    return {
      companies: sortedCompanyList,
      masterFile: `SEP=,\n${masterCSVFile}`,
    };
  } catch (error) {
    console.error('error', error);
    return { statusCode: 500, message: 'Internal Server Error' };
  }
};
