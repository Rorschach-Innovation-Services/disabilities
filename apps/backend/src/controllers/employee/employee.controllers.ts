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
    const CompanyDocResponse = await Company.get({ id: company });
    const companyDoc = CompanyDocResponse.Item;
    if (!companyDoc) {
      return response.status(404).json({ message: 'Company Not Found!' });
    }

    /**Check if the department exists in the database */
    const departmentDocumentResponse = await Department.get({ id: department });
    const departmentDocument = departmentDocumentResponse.Item;
    if (!departmentDocument) {
      return response.status(404).json({ message: 'Department not found' });
    }

    const employeeDocResponse = await Employee.get({ id: employeeId });
    const employeeDoc = employeeDocResponse.Item;
    if (employeeDoc) {
      await Employee.update({
        id: employeeId,
        companyId: company,
        departmentId: department,
        age,
        gender,
        phone,
        id_number,
      });

      return response
        .status(200)
        .json({ message: 'Employee Saved Successfully' });
    }
    const employeeData = {
      id: v4(),
      companyId: company,
      departmentId: department,
      name,
      email,
      age,
      gender,
      phone,
      id_number,
    };
    await Employee.put(employeeData);
    return response
      .status(200)
      .json({
        message: 'Employee Saved Successfully',
        employee: employeeData.id,
      });
  } catch (error) {
    if ((error as any).code === 11000) {
      return response.status(409).send({ message: 'Employee Already Exists.' });
    }

    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
