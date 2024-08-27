import { Administrator, Company } from '../../models';
import { Request, Response } from 'express';
import { getQueryStringParameters, APIGatewayEvent } from '../../utilities/api';

export const getClients = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    // if (!id)
    // return { statusCode: 400, message: 'Admin ID is required!' };
    const admin = await Administrator.get({ id: id });
    if (!admin) {
      return response.status(400).json({ message: 'Admin Not Found!' });
    }
    const clients = await Company.query(
      { _en: 'company' },
      { index: 'gsIndex' },
    );
    const adminClients = clients.items.filter((client) => {
      return client.adminEmail && !client.deleted
        ? client.adminEmail === id
        : false;
    });
    return response.status(200).json({ clients: adminClients });
    // return { clients: adminClients };
  } catch (error) {
    console.log(error);
    // return { message: 'Internal Server Error' };
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
