/**
 * Getting the assessments completed by the employees of a specific company grouped together based on date of completion
 */
import { Department, Company, Employee } from "../../models/";
import {
  DepartmentDb,
  DepartmentDocument,
} from "../../models/department.model";
import { Request, Response } from "express";
import { parseAsync } from "json2csv";
import { format, isAfter } from "date-fns";
import {
  csvOptions,
  transformData,
  TransformedResult,
} from "../../utilities/transform";
import { AssessmentDocument } from "../../models/assessment.model";
import assert from "assert";

interface ResponseAssessmentsType extends DepartmentDb {
  // lastAssessmentDate: string;
  csvFile: string;
}

export const getClientAssessments = async (
  request: Request,
  response: Response
) => {
  try {
    const { companyID } = request.params;
    // Ensure company exists
    const company = await Company.findById(companyID).where("deleted").equals(false);
    if (!company) {
      return response.status(400).json({ message: "No such company exists" });
    }

    //Find assessments associated to department
    const departments = await Department.find({
      company: company._id,
      deleted: false,
    })
      .populate("assessments")
      .exec();
    console.log("Departments: -", departments[0].assessments)
    if (!departments.length) {
      return response
        .status(200)
        .json({ clientName: company.name, departments: [], masterFile: "" });
    }
    const dates: string[] = [];
    departments.forEach((department) => {
      const assDates: Date[] = [];

      (department.assessments as AssessmentDocument[]).forEach((assessment) => {
        // if (isAfter(new Date(assessment.created), new Date(date)))
          assDates.push(new Date(assessment.created));
      });
      const latestDate = new Date(Math.max(...assDates.map((date: Date) => date.getTime())))
      dates.push(assDates.length === 0 ? "none" : latestDate.toDateString());
    });

    const responseAssessments: DepartmentDocument[] = [];
    const departmentCSVs: string[] = [];
    const masterFileData: TransformedResult[] = [];

    for (const department of departments) {
      const csvData: TransformedResult[] = [];
      console.log("department", department);
      console.log("assessments", department.assessments);

      for (const assessment of department.assessments) {
        const employee = await Employee.findById(
          (assessment as AssessmentDocument).employee
        );
        assert(employee !== null);
        const transformedDate = transformData({
          employee,
          assessment: assessment as AssessmentDocument,
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
    console.log("error", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
};
