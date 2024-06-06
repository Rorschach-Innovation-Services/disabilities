/**
 * Get all companies consulted by an admin
 */
import { Assessment, Company, Employee, Department } from '../../models';

export const getCompanies = async () => {
  try {
    const companiesResponse = await Company.query(
      { _en: 'company' },
      { index: 'gsIndex' }
    );
    const companies = companiesResponse.items;
    const existingCompanies = companies.filter((company) => !company.deleted);
    const returnCompanies = Promise.all(
      existingCompanies.map(async (company) => {
        const assessmentsResonse = await Assessment.query(
          { companyId: company.id },
          {}
        );
        const assessments = assessmentsResonse.items || [];
        const employeesResponse = await Employee.query(
          { _en: 'employee' },
          { index: 'gsIndex', beginsWith: company.id }
        );
        const departmentsResponse = await Department.query(
          { companyId: company.id },
          { index: 'gsIndex' }
        );
        const employees = employeesResponse.items || [];
        const employeesLength = employees.length;
        company.status =
          parseInt(`${assessments.length / employeesLength}`) === 1
            ? 'Profile Completed'
            : 'In Progress';
        return { ...company, departments: departmentsResponse.items || [] };
      })
    );
    return returnCompanies.then((res) => {
      const sortedCompanyList = res.sort((x, y) => {
        // x.created = new Date(x.created)
        return Number(y.created) - Number(x.created);
      });
      return { companies: sortedCompanyList };
    });
  } catch (error) {
    console.error(error);
    return { message: 'Internal Server Error' };
  }
};
