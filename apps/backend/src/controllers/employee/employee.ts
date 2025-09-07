/**
 * Employee Controllers
 */
import { Employee, Company, Department } from '../../models';
import { getRequestBody, APIGatewayEvent } from '../../utilities/api';
import { Request, Response } from 'express';

/**
 * Save an Employee To The Platform
 */
export const saveEmployee = async (request: Request, response: Response) => {
  try {
    const requestBody = request.body;
    // const requestBody = getRequestBody(event);
    // if (!requestBody)
    //   return { statusCode: 400, message: 'Request Body is required!' };
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
      return response.status(400).json({ message: 'Company Not Found!' });
      // return { message: 'Company Not Found!' };
    }

    /**Check if the department exists in the database */
    const departmentDocument = await Department.get({ id: department });
    if (!departmentDocument) {
      return response.status(400).json({ message: 'Department Not Found!' });
      // return { message: 'Department not found' };
    }

    const employeeDoc = await Employee.get({ id: employeeId });
    if (employeeDoc) {
      await Employee.update(
        { id: employeeId },
        {
          companyId: company,
          departmentId: department,
        },
      );

      return response
        .status(200)
        .json({ message: 'Employee Saved Successfully', employee: employeeId });
    }
    const employeeData = await Employee.create({
      companyId: company,
      departmentId: department,
      name,
      email,
      deleted: false,
    });
    return response.status(200).json({
      message: 'Employee Saved Successfully',
      employee: employeeData?.id,
    });
  } catch (error) {
    if ((error as any).code === 11000) {
      return response.status(400).json({ message: 'Employee Already Exists.' });
    }

    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
