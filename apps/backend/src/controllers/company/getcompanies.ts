/**
 * Get all companies consulted by an admin
 */
import { Company, Department } from '../../models';
import { Request, Response } from 'express';

export const getCompanies = async (request: Request, response: Response) => {
  try {
    const companiesResponse = await Company.query(
      { _en: 'company' },
      { index: 'gsIndex' },
    );
    const companies = companiesResponse.items;
    const existingCompanies = companies.filter((company) => !company.deleted);
    const returnCompanies = Promise.all(
      existingCompanies.map(async (company) => {
        const departmentsResponse = await Department.query(
          { companyId: company.id },
          { index: 'gsIndex' },
        );
        company.status = departmentsResponse.items
          .filter((item) =>
            [0, 1].includes(Object.keys(item.completedQuestionnaires).length),
          )
          .length.toString();
        return { ...company, departments: departmentsResponse.items || [] };
      }),
    );
    return returnCompanies.then((res) => {
      const sortedCompanyList = res.sort((x, y) => {
        // x.created = new Date(x.created)
        return Number(y.created) - Number(x.created);
      });
      return response.status(200).json({ companies: sortedCompanyList });
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
