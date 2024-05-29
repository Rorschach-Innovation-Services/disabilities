import { Employee, Assessment } from '../../models';

export const getEmployee = async (id: string) => {
  try {
    const employee = await Employee.get({ id });

    if (!employee || employee.deleted)
      return { message: "Employee doesn't exist." };

    const assessmentResponse = await Assessment.query(
      {
        companyId: employee.companyId,
      },
      { beginsWith: `${employee.departmentId}:${employee.id}` }
    );
    const assessment = assessmentResponse.items || [];
    return {
      employee: { ...employee, assessment: assessment ? assessment : null },
    };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
