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
    const viewer = (request as any).user as any;
    const viewerRole = String(viewer?.role || '').toLowerCase();
    const viewerCompanyId = String(viewer?.companyId || '');

    // Always drop deleted
    let filtered = admins.filter((u: any) => !u.deleted);

    if (['administrator', 'admin'].includes(viewerRole)) {
      // no extra filtering
    } else if (viewerRole === 'pivot') {
      // Pivot: see only client roles across companies
      filtered = filtered.filter((u: any) => {
        const r = String(u.role || '').toLowerCase();
        return r === 'client' || r === 'client_user' || r === 'client_super';
      });
    } else if (viewerRole === 'client_super') {
      // Client Super: see client normal users within own company
      filtered = filtered.filter((u: any) => {
        const r = String(u.role || '').toLowerCase();
        const c = String(u.companyId || '');
        return r === 'client_user' && c === viewerCompanyId;
      });
    } else {
      // Other roles: do not expose list
      filtered = [];
    }

    return response.status(200).json({ message: 'OK', admins: filtered });
    // return { admins: adminsRes };
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
