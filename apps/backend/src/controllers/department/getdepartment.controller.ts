import { Request, Response } from "express";
import { Department, Assessment } from "../../models";
import { EmployeeDocument } from "../../models/employee.model";

type Result = EmployeeDocument & { lastAssessmentDate: string };

export const getDepartment = async (request: Request, response: Response) => {
  try {
    const { departmentId } = request.params;
    const department = await Department.findById(departmentId)
      .where("deleted")
      .equals(false)
      .populate("company")
      .populate("assessments")
      .populate("employees");
    if (!department)
      return response.status(400).json({ message: "Department not found." });
    const employees = [...department.employees] as Result[];
    for (let i = 0; i < employees.length; i++) {
      const assessment = await Assessment.findOne({
        employee: employees[i]._id,
      })
        .sort({ created: -1 })
        .exec();

      employees[i] = {
        ...employees[i].toJSON(),
        lastAssessmentDate: assessment ? assessment.created : "none",
      } as Result;
    }

    return response.status(200).json({
      department: {
        ...department.toJSON(),
        employees: employees.filter((employee) => !employee.deleted),
      },
    });
  } catch (error) {
    return response.status(500).json({ message: "Internal Server Error" });
  }
};
