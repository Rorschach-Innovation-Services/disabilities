/**
 * Employee Controllers
 */
import { Employee, Company, Department } from '../../models';
import { getRequestBody, APIGatewayEvent } from 'src/utilities/api';

/**
 * Save an Employee To The Platform
 */
export const saveEmployee = async (event: APIGatewayEvent) => {
  try {
    const requestBody = getRequestBody(event);
    if (!requestBody)
      return { statusCode: 400, message: 'Request Body is required!' };
    const {
      gender,
      phone,
      name,
      department,
      company,
      email,
      age,
      id_number,
      employeeId,
    } = requestBody;
    console.log('company', company);
    const companyDoc = await Company.get({ id: company });
    if (!companyDoc) {
      return { message: 'Company Not Found!' };
    }

    /**Check if the department exists in the database */
    const departmentDocument = await Department.get({ id: department });
    if (!departmentDocument) {
      return { message: 'Department not found' };
    }

    const employeeDoc = await Employee.get({ id: employeeId });
    if (employeeDoc) {
      await Employee.update(
        { id: employeeId },
        {
          companyId: company,
          departmentId: department,
          age,
          gender,
          phone,
          id_number,
        }
      );

      return { message: 'Employee Saved Successfully' };
    }
    const employeeData = await Employee.create({
      companyId: company,
      departmentId: department,
      name,
      email,
      age,
      gender,
      phone,
      id_number,
      deleted: false,
      bio: '',
    });
    return {
      message: 'Employee Saved Successfully',
      employee: employeeData?.id,
    };
  } catch (error) {
    if ((error as any).code === 11000) {
      return { message: 'Employee Already Exists.' };
    }

    return { message: 'Internal Server Error' };
  }
};
