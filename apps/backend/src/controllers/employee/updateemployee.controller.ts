import { Request, Response } from "express";
import { Department, Employee } from "../../models";
import { AssessmentDocument } from "../../models/assessment.model";
import mongoose from "mongoose";

export const updateEmployee = async (request: Request, response: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = request.params;
    const { name, email, idNumber, age, gender, questionnaire, departmentId } =
      request.body;
    const employee = await Employee.findById(id);
    const department = await Department.findById(departmentId).populate(
      "assessments"
    );

    if (!employee)
      return response.status(400).json({ message: "Employee not found." });
    if (!department)
      return response.status(400).json({ message: "Department not found." });

    let assessment: AssessmentDocument | null = null;
    for (const depAssessment of department.assessments as AssessmentDocument[]) {
      if (depAssessment.employee === employee._id) assessment = depAssessment;
    }

    employee.name = name;
    employee.email = email;
    employee.id_number = idNumber;
    employee.age = age;
    employee.gender = gender;

    await employee.save({ session });
    if (assessment !== null) {
      assessment.questionnaire = questionnaire;
      await assessment.save({ session });
    }
    await session.commitTransaction();

    return response.status(200).json({ message: "Successfully updated." });
  } catch (error) {
    await session.abortTransaction();
    return response.status(500).json({ message: "Internal Server Error" });
  } finally {
    session.endSession();
  }
};
