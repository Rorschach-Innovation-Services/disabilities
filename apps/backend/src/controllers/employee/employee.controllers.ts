/**
 * Employee Controllers
 */
import { Employee, Company, Department } from '../../models';
import { Request, Response } from 'express';
import { v4 } from 'uuid';

/**
 * Save an Employee To The Platform
 */
export const saveEmployee = async (request: Request, response: Response) => {
  try {
    const {
      employeeId,
      company,
      name,
      email,
      age,
      gender,
      phone,
      id_number,
      department,
    } = request.body;
    console.log('company', company);
    const companyDoc = await Company.get({ id: company });
    if (!companyDoc) {
      return response.status(404).json({ message: 'Company Not Found!' });
    }

    /**Check if the department exists in the database */
    const departmentDocument = await Department.get({ id: department });
    if (!departmentDocument) {
      return response.status(404).json({ message: 'Department not found' });
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

      return response
        .status(200)
        .json({ message: 'Employee Saved Successfully' });
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
    return response.status(200).json({
      message: 'Employee Saved Successfully',
      employee: employeeData?.id,
    });
  } catch (error) {
    if ((error as any).code === 11000) {
      return response.status(409).send({ message: 'Employee Already Exists.' });
    }

    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
