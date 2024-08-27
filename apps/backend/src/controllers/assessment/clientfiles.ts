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
import { Request, Response } from 'express';

/**
 * Retrieve all client csv files and create master file
 * @param request object
 * @param response object
 * @returns response
 */
export const getClientFilesOld = async (
  request: Request,
  response: Response,
) => {
  try {
    const companyResponse = await Company.query(
      { _en: 'company' },
      { index: 'gsIndex' },
    );
    const companies =
      companyResponse.items.filter(
        (item) => item._en === 'company' && !item.deleted,
      ) || [];
    if (!companies) {
      return response.status(400).json({ message: 'Companies not found' });
      // return { statusCode: 400, message: 'Companies not found' };
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
        {},
      );
      const assessments =
        assessmentResponse.items.filter(
          (item) => item._en === 'assessment' && !item.deleted,
        ) || [];

      if (!assessments.length) {
        console.log('Running if length is 0');
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
      console.log('About to go over assessments');
      for (const assessment of assessments) {
        if (assessment.deleted) continue;
        const employee = await Employee.get({
          id: assessment.employeeId,
        });

        if (employee) {
          console.log('Transforming employee data');
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
        { index: 'gsIndex', beginsWith: company.id },
      );
      const employees =
        employeesResponse.items.filter(
          (item) => item._en === 'employee' && !item.deleted,
        ) || [];
      console.log('Parse async');
      const clientCSVFile = await parseAsync(singleClientData, csvOptions);
      modifiedCompany.csvFile = `SEP=,\n${clientCSVFile}`;
      modifiedCompany.lastAssessmentDate = assessmentDate;
      modifiedCompany.status =
        employees.length === company.employeeSize ? 'Complete' : 'In Process';

      modifiedCompanies.push(modifiedCompany);
    }

    // Create master file
    console.log('Master Parse Async');
    const masterCSVFile = await parseAsync(masterFileData, csvOptions);

    const sortedCompanyList = modifiedCompanies.sort((x, y) => {
      return Number(y.created) - Number(x.created);
    });
    return response.status(200).json({
      companies: sortedCompanyList,
      masterFile: `SEP=,\n${masterCSVFile}`,
    });
  } catch (error) {
    console.error('error', error);
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { statusCode: 500, message: 'Internal Server Error' };
  }
};

export const getClientFiles = async (request: Request, response: Response) => {
  try {
    const companyResponse = await Company.query(
      { _en: 'company' },
      { index: 'gsIndex' },
    );
    const companies = companyResponse.items.filter(
      (item) => item._en === 'company' && !item.deleted,
    );

    if (!companies.length) {
      return response.status(400).json({ message: 'Companies not found' });
      // return { statusCode: 400, message: 'Companies not found' };
    }

    const masterFileData: TransformedResult[] = [];
    const modifiedCompanies: any[] = [];

    // Fetch all assessments for all companies in parallel
    const assessmentPromises = companies.map((company) =>
      Assessment.query({ companyId: company.id }, {}).then((response) => ({
        company,
        assessments: response.items.filter(
          (item) => item._en === 'assessment' && !item.deleted,
        ),
      })),
    );

    const assessmentResults = await Promise.all(assessmentPromises);

    for (const { company, assessments } of assessmentResults) {
      if (!assessments.length) {
        modifiedCompanies.push({
          ...company,
          csvFile: await parseAsync([], csvOptions),
          lastAssessmentDate: 'none',
          status: 'In Process',
        });
        continue;
      }

      const singleClientData: TransformedResult[] = [];
      let latestAssessmentDate = assessments[0].created;

      const employeePromises = assessments.map((assessment) =>
        Employee.get({ id: assessment.employeeId }).then((employee) => ({
          assessment,
          employee,
        })),
      );

      const employeeResults = await Promise.all(employeePromises);

      for (const { assessment, employee } of employeeResults) {
        if (!employee) continue;

        const resultData = transformData({
          employee,
          company,
          assessment,
        });

        singleClientData.push(resultData);
        masterFileData.push(resultData);

        if (
          isAfter(new Date(assessment.created), new Date(latestAssessmentDate))
        ) {
          latestAssessmentDate = assessment.created;
        }
      }

      const employeesResponse = await Employee.query(
        { _en: 'employee' },
        { index: 'gsIndex', beginsWith: company.id },
      );

      const employees = employeesResponse.items.filter(
        (item) => item._en === 'employee' && !item.deleted,
      );

      const clientCSVFile = await parseAsync(singleClientData, csvOptions);
      modifiedCompanies.push({
        ...company,
        csvFile: `SEP=,\n${clientCSVFile}`,
        lastAssessmentDate: latestAssessmentDate,
        status:
          employees.length === company.employeeSize ? 'Complete' : 'In Process',
      });
    }

    const masterCSVFile = await parseAsync(masterFileData, csvOptions);
    const sortedCompanyList = modifiedCompanies.sort(
      (x, y) => y.created - x.created,
    );

    return response.status(200).json({
      companies: sortedCompanyList,
      masterFile: `SEP=,\n${masterCSVFile}`,
    });
  } catch (error) {
    console.error('error', error);
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { statusCode: 500, message: 'Internal Server Error' };
  }
};
