/**
 * Admin Reset Password Controller
 */
import { Administrator } from '../../models';

export const handler = async (parameters) => {
  try {
    console.log('parameters', parameters);
    const adminsResponse = await Administrator.query(
      { _en: 'administrator' },
      { index: 'gsIndex' }
    );
    console.log('admins', adminsResponse.items);
    const admins = adminsResponse.items;
    if (!admins) {
      return { message: 'Admins Not Found!' };
    }
    const adminsRes = admins.filter((admin) => !admin.deleted);
    return { admins: adminsRes };
  } catch (error) {
    console.error(error);
    return { message: 'Internal Server Error' };
  }
};

export default handler;
