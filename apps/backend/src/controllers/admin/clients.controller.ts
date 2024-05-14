/**
 * Admin Reset Password Controller
 */
import { Request, Response } from 'express';
import { Administrator, Company } from '../../models';

export default async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const admin = await Administrator.get({ id });
    if (!admin) {
      return response.status(400).json({ message: 'Admin Not Found!' });
    }
    const clients = await Company.query({ all: 'companies' });
    // console.log(clients)
    const adminClients = clients.Items?.filter((client) => {
      return client.adminEmail && !client.deleted
        ? client.adminEmail === id
        : false;
    });
    // console.log("Admin Cl ", adminClients)
    return response.status(200).json({ clients: adminClients });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
