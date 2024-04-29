import { Request, Response } from "express";
import { Assessment, Employee } from "../../models/";

export const deleteEmployees = async (request: Request, response: Response) => {
  try {
    const { employees } = request.body;
    for (const id of employees) {
      await Employee.findByIdAndUpdate(id, { deleted: true });
      await Assessment.updateMany({ employee: id }, { deleted: true });
    }
    return response
      .status(200)
      .json({ message: "Employees successfully deleted" });
  } catch (error) {
    return response.status(500).json({ message: "Internal Server Error" });
  }
};
