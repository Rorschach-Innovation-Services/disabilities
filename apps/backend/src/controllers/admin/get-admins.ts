import { Administrator } from '../../models';

export const getAdmins = async () => {
  try {
    const adminsResponse = await Administrator.query(
      { _en: 'administrator' },
      { index: 'gsIndex' }
    );
    const admins = adminsResponse.items;
    if (!admins) {
      return { statusCode: 400, message: 'Admins Not Found!' };
    }
    const adminsRes = admins.filter((admin) => !admin.deleted);
    return { admins: adminsRes };
  } catch (error) {
    console.error(error);
    return { message: 'Internal Server Error' };
  }
};
