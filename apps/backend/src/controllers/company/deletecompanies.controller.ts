/**
 * Responsible for marking a list of companies as deleted but not deleting from db
 *
 * */
import { Request, Response } from "express";
import { Assessment, Department, Employee } from "../../models";
import Company from "../../models/company.model";

export const deleteCompanies = async (request: Request, response: Response) => {
  try {
    const { companyIDs } = request.body;
    console.log("called", request.body);
    for (const id of companyIDs) {
      await Company.findByIdAndUpdate(id, { $set: { deleted: true } });
      await Department.updateMany({ company: id }, { deleted: true });
      await Employee.updateMany({ company: id }, { deleted: true });
      await Assessment.updateMany({ company: id }, { deleted: true });
    }
    response.status(200).json({ message: "Companies successfully deleted" });
  } catch (error) {
    return response.status(500).json({ message: "Internal Server Error" });
  }
};
