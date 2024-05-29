/**
 * Responsible for marking a list of companies as deleted but not deleting from db
 *
 * */
import { Company } from '../../models/company.model';

export const deleteCompanies = async (companyIDs: string[]) => {
  try {
    for (const id of companyIDs) {
      await Company.update({ id }, { deleted: true });
    }
    return { message: 'Companies successfully deleted' };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
