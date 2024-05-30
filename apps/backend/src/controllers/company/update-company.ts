/**
 * Get a companies consulted by an admin
 */
import { Company } from '../../models';

export const updateCompany = async (id: string, body: Record<string, any>) => {
  try {
    const company = await Company.get({ id });
    await Company.update({ id }, { ...body });
    if (!company || company.deleted) {
      return { message: 'Company Not Found' };
    }
    return { message: 'Updated successfully.', company };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
