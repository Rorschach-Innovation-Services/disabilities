/**
 * Responsible for marking a list of departments as deleted but not deleting from db
 *
 * */
import { Request, Response } from "express";
import { Assessment, Department, Employee } from "../../models/";

export const deleteDepartments = async (
  request: Request,
  response: Response
) => {
  try {
    const { departments } = request.body;
    console.log("departments", departments);
    for (const id of departments) {
      await Department.findByIdAndUpdate(id, { deleted: true });
      await Employee.updateMany({ department: id }, { deleted: true });
      await Assessment.updateMany({ department: id }, { deleted: true });
    }
    return response
      .status(200)
      .json({ message: "Departments successfully deleted" });
  } catch (error) {
    return response.status(500).json({ message: "Internal Server Error" });
  }
};
