import { Request, Response } from "express";
import { Employee, Assessment } from "../../models";

export const getEmployee = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const employee = await Employee.findById(id)
      .where("deleted")
      .equals(false)
      .populate("assessment")
      .populate("company");

    if (!employee || employee.deleted)
      return response.status(400).json({ message: "Employee doesn't exist." });

    const assessment = await Assessment.findOne({ employee: employee._id });
    return response
      .status(200)
      .json({ employee: { ...employee.toJSON(), assessment: assessment ? assessment : null } });
  } catch (error) {
    return response.status(500).json({ message: "Internal Server Error" });
  }
};
