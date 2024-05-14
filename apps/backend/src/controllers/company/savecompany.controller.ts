/**
 * Save Company Controllers
 */
import { Company, Employee } from '../../models';
import { Request, Response } from 'express';
import emailSend from '../../utilities/sendEmail';
import { Department } from '../../models/department.model';
import { v4 } from 'uuid';

/**
 * Save the company and if employees found, send them emails
 */
export default async (request: Request, response: Response) => {
  try {
    const {
      id,
      name,
      sector,
      hrConsultantName,
      hrConsultantEmail,
      logo,
      employees,
      employeeSize,
      phone,
      department,
      admin,
    } = request.body;
    if (id === null) {
      const companyId = v4();
      const company = {
        id: companyId,
        name,
        sector,
        hrConsultantName,
        hrConsultantEmail,
        logo,
        employeeSize,
        phone,
        adminId: admin,
        adminEmail: '',
      };
      await Company.put(company);
      const departmentData = {
        id: v4(),
        name: department,
        company: company.id,
        employeeSize,
      };

      await Department.put(departmentData);
      if (employees && employees.length > 0) {
        const employeesList = await employees.map(async (employee: any) => {
          // give each employee company and department id's
          const employeeData = {
            ...employee,
            id: v4(),
            name: employee.name,
            department: department.id,
            email: employee.email,
            companyId: company.id,
          };
          await Employee.put(employeeData);
          return employeeData;
        });

        await employeesList.forEach(async (employee: any) => {
          const emailSubject =
            'Welcome to the Sleep Science Wellness Assessment';
          const emailMessage = `Please complete the following questions for our team to determine your sleep score. Please click the link to access the sleep assessment: http://www.sleepscience.co.za/questionnaire/${company.id}/${departmentData.id}/${employee.id}`;
          await emailSend(
            employee.email,
            employee.name,
            emailSubject,
            emailMessage
          );
        });
        return response.status(200).json({
          message: 'Company, department and employees registered!',
        });
      } else {
        /**Register company and department only */
        return response.status(200).json({
          message: 'Company Registered!',
          company: company.id,
          department: departmentData.id,
        });
      }
    } else {
      const companyResponse = await Company.get({ id });
      const company = companyResponse.Item;
      if (!company)
        return response.status(400).json({ message: 'Company not found' });
      const departmentData = {
        id: v4(),
        name: department,
        company: company.id,
        employeeSize,
      };

      await Department.put(departmentData);

      if (employees && employees.length > 0) {
        const employeesList = await employees.map(async (employee: any) => {
          // give each employee company and department id's
          const employeeData = {
            ...employee,
            id: v4(),
            name: employee.name,
            department: department.id,
            email: employee.email,
            companyId: company.id,
          };
          await Employee.put(employeeData);
          return employeeData;
        });
        await employeesList.forEach(async (employee: any) => {
          const emailSubject =
            'Welcome to the Sleep Science Wellness Assessment';
          const emailMessage = `Please complete the following questions for our team to determine your sleep score. Please click the link to access the sleep assessment: http://www.sleepscience.co.za/questionnaire/${company.id}/${departmentData.id}/${employee.id}`;
          await emailSend(
            employee.email,
            employee.name,
            emailSubject,
            emailMessage
          );
        });
        return response.status(200).json({ message: 'Company Registered!' });
      } else {
        /**Register company only */
        return response.status(200).json({
          message: 'Company Registered!',
          company: company.id,
          department: departmentData.id,
        });
      }
    }
  } catch (error) {
    return response
      .status(500)
      .json({ message: 'Internal Server Error', error });
  }
};
