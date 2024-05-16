/**
 * Save Company Controllers
 */
import { Company, Employee } from '../../models';
import { Request, Response } from 'express';
import emailSend from '../../utilities/sendEmail';
import { Department } from '../../models/department.model';

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
      const company = await Company.create({
        name,
        sector,
        hrConsultantName,
        hrConsultantEmail,
        logo,
        employeeSize,
        phone,
        adminId: admin,
        adminEmail: '',
        deleted: false,
        status: 'active',
      });

      const departmentData = await Department.create({
        name: department,
        companyId: company?.id as string,
        employeeSize,
        deleted: false,
      });

      if (employees && employees.length > 0) {
        const employeesList = await employees.map(async (employee: any) => {
          // give each employee company and department id's
          const employeeData = await Employee.create({
            ...employee,
            name: employee.name,
            department: department.id,
            email: employee.email,
            companyId: company?.id,
          });
          return employeeData;
        });

        await employeesList.forEach(async (employee: any) => {
          const emailSubject =
            'Welcome to the Sleep Science Wellness Assessment';
          const emailMessage = `Please complete the following questions for our team to determine your sleep score. Please click the link to access the sleep assessment: http://www.sleepscience.co.za/questionnaire/${company?.id}/${departmentData?.id}/${employee.id}`;
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
          company: company?.id,
          department: departmentData?.id,
        });
      }
    } else {
      const company = await Company.get({ id });
      if (!company)
        return response.status(400).json({ message: 'Company not found' });

      const departmentData = await Department.create({
        name: department,
        companyId: company?.id as string,
        employeeSize,
        deleted: false,
      });

      if (employees && employees.length > 0) {
        const employeesList = await employees.map(async (employee: any) => {
          // give each employee company and department id's
          const employeeData = await Employee.create({
            ...employee,
            name: employee.name,
            department: department.id,
            email: employee.email,
            companyId: company.id,
          });
          return employeeData;
        });
        await employeesList.forEach(async (employee: any) => {
          const emailSubject =
            'Welcome to the Sleep Science Wellness Assessment';
          const emailMessage = `Please complete the following questions for our team to determine your sleep score. Please click the link to access the sleep assessment: http://www.sleepscience.co.za/questionnaire/${company.id}/${departmentData?.id}/${employee.id}`;
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
          department: departmentData?.id,
        });
      }
    }
  } catch (error) {
    return response
      .status(500)
      .json({ message: 'Internal Server Error', error });
  }
};
