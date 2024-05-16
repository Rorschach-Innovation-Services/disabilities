import { Request, Response } from 'express';
import { Employee, Assessment } from '../../models';

export const getEmployee = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const employee = await Employee.get({ id });

    if (!employee || employee.deleted)
      return response.status(400).json({ message: "Employee doesn't exist." });

    const assessmentResponse = await Assessment.query(
      {
        companyId: employee.companyId,
      },
      { beginsWith: `${employee.departmentId}:${employee.id}` }
    );
    const assessment = assessmentResponse.items || [];
    return response.status(200).json({
      employee: { ...employee, assessment: assessment ? assessment : null },
    });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
