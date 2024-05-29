/**
 * Get a companies consulted by an admin
 */
import { Company, Administrator } from '../../models';

export const handler = async (id: string) => {
  try {
    const company = await Company.get({ id });
    if (!company || company.deleted) {
      return { message: 'Company Not Found' };
    }
    const admin = await Administrator.get({
      id: company.adminId,
    });
    if (!admin) {
      return { company, message: 'Admin not found' };
    }
    return { company, admin: admin.name };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
