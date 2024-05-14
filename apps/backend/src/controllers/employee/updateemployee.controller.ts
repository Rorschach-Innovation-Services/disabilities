import { Request, Response } from 'express';
import { Assessment, Department, Employee } from '../../models';

export const updateEmployee = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { name, email, idNumber, age, gender, questionnaire, departmentId } =
      request.body;
    const employeeResponse = await Employee.get({ id });
    const employee = employeeResponse.Item;
    const departmentResponse = await Department.get({ id: departmentId });
    const department = departmentResponse.Item;

    if (!employee)
      return response.status(400).json({ message: 'Employee not found.' });
    if (!department)
      return response.status(400).json({ message: 'Department not found.' });

    const assessmentResponse = await Assessment.query(
      { compantId: department.companyId },
      { beginsWith: department.id }
    );
    const assessments = assessmentResponse.Items || [];

    let assessment: any = null;
    for (const depAssessment of assessments) {
      if (depAssessment.employeeId === employee.id) assessment = depAssessment;
    }
    await Employee.update({
      id: employee.id,
      name,
      email,
      id_number: idNumber,
      age,
      gender,
    });

    if (assessment !== null) {
      assessment.questionnaire = questionnaire;
      await Assessment.update({
        companyId: assessment.companyId,
        employeeId: employee,
        questionnaire,
        departmentId: department,
        sk: `${department}#${employee}#${id}`,
      });
    }

    return response.status(200).json({ message: 'Successfully updated.' });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
