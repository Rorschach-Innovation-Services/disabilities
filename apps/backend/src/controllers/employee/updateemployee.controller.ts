import { Request, Response } from 'express';
import { Assessment, Department, Employee } from '../../models';

export const updateEmployee = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { name, email, idNumber, age, gender, questionnaire, departmentId } =
      request.body;
    const employee = await Employee.get({ id });
    const department = await Department.get({ id: departmentId });

    if (!employee)
      return response.status(400).json({ message: 'Employee not found.' });
    if (!department)
      return response.status(400).json({ message: 'Department not found.' });

    const assessmentResponse = await Assessment.query(
      { companyId: department.companyId },
      { beginsWith: department.id }
    );
    const assessments = assessmentResponse.items || [];

    let assessment: any = null;
    for (const depAssessment of assessments) {
      if (depAssessment.employeeId === employee.id) assessment = depAssessment;
    }
    await Employee.update(
      { id: employee.id },
      {
        name,
        email,
        id_number: idNumber,
        age,
        gender,
      }
    );

    if (assessment !== null) {
      await Assessment.update(
        {
          companyId: assessment.companyId,
          employeeId: employee.id,
          departmentId: department.id,
          id: assessment.id,
        },
        {
          questionnaire,
        }
      );
    }

    return response.status(200).json({ message: 'Successfully updated.' });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
