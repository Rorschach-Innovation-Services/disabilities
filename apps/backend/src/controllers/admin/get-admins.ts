import { Administrator } from '../../models';
import { Request, Response } from 'express';

export const getAdmins = async (request: Request, response: Response) => {
  try {
    const adminsResponse = await Administrator.query(
      { _en: 'administrator' },
      { index: 'gsIndex' },
    );
    const admins = adminsResponse.items;
    if (!admins) {
      return response.status(400).json({ message: 'Admin Not Found!' });
      // return { statusCode: 400, message: 'Admins Not Found!' };
    }
    const adminsRes = admins.filter((admin) => !admin.deleted);
    return response
      .status(200)
      .json({ message: 'Admin Deleted', admins: adminsRes });
    // return { admins: adminsRes };
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
