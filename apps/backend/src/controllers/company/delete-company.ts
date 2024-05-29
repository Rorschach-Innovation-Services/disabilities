/**
 * Responsible for marking a list of companies as deleted but not deleting from db
 *
 * */
import { Company } from '../../models/company.model';

export const deleteCompany = async (id: string) => {
  try {
    await Company.update({ id }, { deleted: true });
    return { message: 'Company successfully deleted' };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
