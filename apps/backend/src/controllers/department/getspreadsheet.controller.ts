import { Response, Request } from "express";
import { parseAsync } from "json2csv";
import { Department, Employee } from "../../models";
import { AssessmentDocument } from "../../models/assessment.model";
import { CompanyDocument } from "../../models/company.model";
import {
  csvOptions,
  transformData,
  TransformedResult,
} from "../../utilities/transform";
import { isAfter } from "date-fns";
import { EmployeeDocument } from "../../models/employee.model";

export const getSpreadsheet = async (request: Request, response: Response) => {
  try {
    const { departmentId } = request.params;

    //Find assessments associated to department
    const department = await Department.findById(departmentId).where("deleted").equals(false)
      .populate("assessments")
      .populate("assessments.employee")
      .populate("company");
    if (!department) {
      return response.status(400).json({ message: "Department not found." });
    }

    let lastAssessmentDate = new Date("December 17, 1995").toString();

    (department.assessments as AssessmentDocument[]).forEach((assessment) => {
      if (isAfter(new Date(assessment.created), new Date(lastAssessmentDate)))
        lastAssessmentDate = assessment.created;
    });

    const masterFileData: TransformedResult[] = [];
    const csvData: TransformedResult[] = [];

    for (const assessment of department.assessments) {
      const employee = (assessment as AssessmentDocument)
        .employee as EmployeeDocument;
      const transformedData = transformData({
        employee,
        assessment: assessment as AssessmentDocument,
        company: department.company as CompanyDocument,
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
    return response.status(500).json({ message: "Internal server error." });
  }
};
