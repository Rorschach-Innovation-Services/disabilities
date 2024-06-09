/**
 * Save Company Controllers
 */
import { Company, Employee, Questionnaire } from '../../models';
import emailSend from '../../utilities/sendEmail';
import { Department } from '../../models/department.model';
import {
  getRequestBody,
  APIGatewayEvent,
  assessmentEmailTemplates,
} from 'src/utilities/api';

/**
 * Save the company and if employees found, send them emails
 */
export const saveCompany = async (event: APIGatewayEvent) => {
  try {
    const requestBody = getRequestBody(event);
    if (!requestBody)
      return { statusCode: 400, message: 'Request Body is required!' };
    const {
      id,
      department,
      name,
      employees,
      admin,
      sector,
      hrConsultantName,
      hrConsultantEmail,
      logo,
      phone,
      employeeSize,
      questionnaireId,
    } = requestBody;
    const questionnaire = await Questionnaire.get({ id: questionnaireId });
    if (id === '') {
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
        completedQuestionnaires: { [questionnaire.order]: 1 },
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
        const { emailSubject, emailMessage } = assessmentEmailTemplates({
          questionnaireId,
          companyId: company?.id,
          departmentId: departmentData?.id,
        });

        await Promise.all(
          employeesList.map((em) => {
            const funct = async (employee: any) => {
              await emailSend(
                employee.email,
                employee.name,
                emailSubject,
                emailMessage
              );
            };
            return funct(em);
          })
        );
        return {
          message: 'Company, department and employees registered!',
          company: company?.id,
          department: departmentData?.id,
          questionnaireId,
        };
      } else {
        /**Register company and department only */
        return {
          message: 'Company Registered!',
          company: company?.id,
          department: departmentData?.id,
          questionnaireId,
        };
      }
    } else {
      const company = await Company.get({ id });
      if (!company) return { statusCode: 400, message: 'Company not found' };

      const departmentData = await Department.create({
        name: department,
        companyId: company?.id as string,
        completedQuestionnaires: { [questionnaire.order]: 1 },
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

        const { emailSubject, emailMessage } = assessmentEmailTemplates({
          questionnaireId,
          companyId: company?.id,
          departmentId: departmentData?.id,
        });
        await Promise.all(
          employeesList.map((item) => {
            const funct = async (employee: any) => {
              await emailSend(
                employee.email,
                employee.name,
                emailSubject,
                emailMessage
              );
            };
            return funct(item);
          })
        );
        return {
          message: 'Company Registered!',
          company: company?.id,
          department: departmentData?.id,
          questionnaireId,
        };
      } else {
        /**Register company only */
        return {
          message: 'Company Registered!',
          company: company.id,
          department: departmentData?.id,
          questionnaireId,
        };
      }
    }
  } catch (error) {
    console.error('Error saving company', error);
    return { statusCode: 500, message: 'Internal Server Error', error };
  }
};
