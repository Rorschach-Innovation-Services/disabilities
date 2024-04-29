/**
 * Save Assessment Controller
 */
import { Request, Response } from "express";
import { Assessment, Employee, Company, Department } from "../../models";
import scoreSleepHealth from "../../utilities/score";
import generateReport from "../../utilities/genReport";
import { Types } from "mongoose";

/**
 * Save Assessment Controller: Score assessment, save then send report to employee
 * @param req
 * @param res
 * @returns
 */
const saveAssessment = async (req: Request, res: Response) => {
  try {
    const { employee, questionnaire, company, department } = req.body;
    const assessmentScore = scoreSleepHealth(questionnaire);

    /**Check if the company exists in the database */
    const companyDocument = await Company.findById(company);
    if (!companyDocument) {
      return res.status(404).json({ message: "Company not found" });
    }

    /**Check if the department exists in the database */
    const departmentDocument = await Department.findById(department);
    if (!departmentDocument) {
      return res.status(404).json({ message: "Department not found" });
    }

    /**Check if the employee exists in the database */
    const employeeDoc = await Employee.findOne({ _id: employee });
    if (!employeeDoc) {
      return res.status(404).json({ message: "Employee Not Found!" });
    }

    /**Limit the number of employee assessments a company needs to complete to not exceed the . */
    if (
      departmentDocument.assessments.length === departmentDocument.employeeSize
    ) {
      return res.status(403).json({
        message: "Cannot Submit Assessment. Limit Exceeded!",
        employee: employeeDoc._id,
      });
    }

    /**Create and save the assessment */
    const assessment = new Assessment({
      employee,
      questionnaire,
      score: assessmentScore,
      company: new Types.ObjectId(company),
      department: new Types.ObjectId(department),
    });
    const savedAssessment = await assessment.save();
    departmentDocument.assessments.push(savedAssessment._id);
    await departmentDocument.save();
    const reportRes = await generateReport(savedAssessment);
    if (typeof reportRes !== "undefined" && "error" in reportRes) {
      return res.status(500).json({
        message: "Something Went Wrong While generating report!",
        error: reportRes.error,
      });
    }
    return res.status(200).json({ message: "Successful", data: reportRes });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default saveAssessment;
