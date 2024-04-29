import { Request, Response } from "express";
import { Assessment, Employee } from "../../models/";
import { generateStreamReport } from "../../utilities/genReport";
import scoreSleepHealth from "../../utilities/score";

export const createIndividualReport = async (
  request: Request,
  response: Response
) => {
  try {
    const { employeeId } = request.params;
    const employee = await Employee.findById(employeeId)
      .where("deleted")
      .equals(false);
    if (!employee)
      return response.status(400).json({ message: "Employee not found." });
    const assessment = await Assessment.findOne({
      employee: employee._id,
    })
      .sort({ created: -1 })
      .exec();
    if (!assessment)
      return response
        .status(400)
        .json({ message: "No assessment exist for employee." });

    const assessmentScore = scoreSleepHealth(assessment.questionnaire);
    assessment.score = assessmentScore;
    assessment.save().then(async (assessment) => {
      const report = await generateStreamReport(assessment, employee);
      response.contentType("application/pdf");
      response.attachment();
      report.pipe(response);
    })
  } catch (error) {
    console.log("error", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
};
