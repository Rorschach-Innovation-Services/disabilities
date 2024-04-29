/**
 * Responsible for marking a list of assessments as deleted but not deleting from db
 *
 * */
import { Request, Response } from "express";
import Assessment from "../../models/assessment.model";

export const deleteAssessments = async (
  request: Request,
  response: Response
) => {
  try {
    const { assessmentDates } = request.body;
    for (const date of assessmentDates) {
      await Assessment.findOneAndUpdate({ created: date }, { deleted: true });
    }
    response.status(200).json({ message: "Assessments successfully deleted" });
  } catch (error) {
    return response.status(500).json({ message: "Internal Server Error" });
  }
};
