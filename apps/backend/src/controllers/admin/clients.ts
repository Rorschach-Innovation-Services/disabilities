import { Administrator, Company } from '../../models';

export const handler = async (id: string) => {
  try {
    const admin = await Administrator.get({ id });
    if (!admin) {
      return { message: 'Admin Not Found!' };
    }
    const clients = await Company.query(
      { _en: 'company' },
      { index: 'gsIndex' }
    );
    const adminClients = clients.items.filter((client) => {
      return client.adminEmail && !client.deleted
        ? client.adminEmail === id
        : false;
    });
    return { clients: adminClients };
  } catch (error) {
    console.log(error);
    return { message: 'Internal Server Error' };
  }
};
