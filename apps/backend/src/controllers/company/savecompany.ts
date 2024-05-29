/**
 * Save Company Controllers
 */
import { Company, Employee } from '../../models';
import emailSend from '../../utilities/sendEmail';
import { Department } from '../../models/department.model';

type Parameters = {
  id: string;
  name: string;
  sector: string;
  hrConsultantName: string;
  hrConsultantEmail: string;
  logo: string;
  employees: any[];
  employeeSize: number;
  phone: string;
  department: string;
  admin: string;
};

/**
 * Save the company and if employees found, send them emails
 */
export const handler = async ({
  department,
  name,
  id,
  employees,
  admin,
  sector,
  hrConsultantName,
  phone,
  hrConsultantEmail,
  logo,
  employeeSize,
}: Parameters) => {
  try {
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
        const employeesList = employees.map(async (employee: any) => {
          // give each employee company and department id's
          const employeeData = await Employee.create({
            ...employee,
            name: employee.name,
            department: departmentData?.id,
            email: employee.email,
            companyId: company?.id,
          });
          return employeeData;
        });

        employeesList.forEach(async (employee: any) => {
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
        return {
          message: 'Company, department and employees registered!',
        };
      } else {
        /**Register company and department only */
        return {
          message: 'Company Registered!',
          company: company?.id,
          department: departmentData?.id,
        };
      }
    } else {
      const company = await Company.get({ id });
      if (!company) return { message: 'Company not found' };

      const departmentData = await Department.create({
        name: department,
        companyId: company?.id as string,
        employeeSize,
        deleted: false,
      });

      if (employees && employees.length > 0) {
        const employeesList = employees.map(async (employee: any) => {
          // give each employee company and department id's
          const employeeData = await Employee.create({
            ...employee,
            name: employee.name,
            department: departmentData?.id,
            email: employee.email,
            companyId: company.id,
          });
          return employeeData;
        });
        employeesList.forEach(async (employee: any) => {
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
        return { message: 'Company Registered!' };
      } else {
        /**Register company only */
        return {
          message: 'Company Registered!',
          company: company.id,
          department: departmentData?.id,
        };
      }
    }
  } catch (error) {
    return { message: 'Internal Server Error', error };
  }
};
