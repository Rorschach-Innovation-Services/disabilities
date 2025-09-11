import { Administrator } from '../../models';
import { Request, Response } from 'express';

/**
 * List client users for a company (client_super sees all users in own company)
 * Admin and Pivot can also view any company's users.
 */
export const getCompanyUsers = async (request: Request, response: Response) => {
  try {
    const { id } = request.params as any; // companyId
    if (!id) return response.status(400).json({ message: 'Company ID required' });

    const adminsResponse = await Administrator.query(
      { _en: 'administrator' },
      { index: 'gsIndex' },
    );
    const admins = (adminsResponse.items || []).filter((a) => !a.deleted);
    const clientUsers = admins.filter((a) => {
      const role = (a.role || '').toLowerCase();
      return a.companyId === id && (role === 'client_super' || role === 'client_user' || role === 'client');
    });
    // Drop password field
    clientUsers.forEach((a) => (a.password = ''));
    return response.status(200).json({ users: clientUsers });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

