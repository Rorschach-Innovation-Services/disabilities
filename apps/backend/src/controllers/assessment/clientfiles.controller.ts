/**
 * Getting client csv files Handlers
 */
import { Assessment, Company, Employee } from "../../models/";
import { Request, Response } from "express";
import { parseAsync } from "json2csv";
import { CompanyDocument } from "../../models/company.model";
import { isAfter } from "date-fns";
import {
  transformData,
  TransformedResult,
  csvOptions,
} from "../../utilities/transform";
import { x } from "pdfkit";

type ModifiedCompanyType = CompanyDocument & {
  csvFile?: string;
  lastAssessmentDate?: string;
  status?: string;
};

/**
 * Retrieve all client csv files and create master file
 * @param request object
 * @param response object
 * @returns response
 */
export const getClientFiles = async (_: Request, response: Response) => {
  try {
    const companies = await Company.find({ deleted: false });
    if (!companies) {
      return response.status(404).json({ message: "Companies not found" });
    }

    // Holding data to be stored in the master csv file
    const masterFileData: TransformedResult[] = [];
    // Companies that have been modified with attributes
    const modifiedCompanies: ModifiedCompanyType[] = [];

    for (const company of companies) {
      if (company.deleted) continue;
      // Create copy of company to have attributes added to it
      const modifiedCompany: ModifiedCompanyType = {
        ...company.toObject(),
      } as ModifiedCompanyType;

      const assessments = await Assessment.find({
        company: company._id,
        deleted: false,
      });

      if (!assessments.length) {
        // Add attributes to the modified company
        modifiedCompany.csvFile = await parseAsync([], csvOptions);
        modifiedCompany.lastAssessmentDate = "none";
        modifiedCompany.status = "In Process";
        modifiedCompanies.push(modifiedCompany);
        continue;
      }

      // Holds data to be made in csv for specific client
      const singleClientData: TransformedResult[] = [];
      // Used to obtain the latest questionnaire submitted from a client
      let assessmentDate = assessments[0].created;

      for (const assessment of assessments) {
        if (assessment.deleted) continue;
        const employee = await Employee.findById(assessment.employee).where("deleted").equals(false);

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

      const clientCSVFile = await parseAsync(singleClientData, csvOptions);
      modifiedCompany.csvFile = `SEP=,\n${clientCSVFile}`;
      modifiedCompany.lastAssessmentDate = assessmentDate;
      modifiedCompany.status =
        company.employees.length === company.employeeSize
          ? "Complete"
          : "In Process";

      modifiedCompanies.push(modifiedCompany);
    }

    // Create master file
    const masterCSVFile = await parseAsync(masterFileData, csvOptions);

    const sortedCompanyList = modifiedCompanies.sort((x, y) => {
      return Number(y.created) - Number(x.created)
    });
    return response.status(200).json({
      companies: sortedCompanyList,
      masterFile: `SEP=,\n${masterCSVFile}`,
    });
  } catch (error) {
    return response.status(500).json({ message: "Internal Server Error" });
  }
};
