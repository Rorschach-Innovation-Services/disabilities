import { Administrator } from '../../models';
import {
  getQueryStringParameters,
  getRequestBody,
  APIGatewayEvent,
} from '../../utilities/api';
import { Request, Response } from 'express';

export const updateProfile = async (request: Request, response: Response) => {
  try {
    // const parameters = getQueryStringParameters(event);
    // const requestBody = getRequestBody(event);
    const requestBody = request.body;
    const parameters = request.params;
    // if (!requestBody)
    //   return { statusCode: 400, message: 'Request Body is required!' };
    // if (!parameters?.id)
    //   return { statusCode: 400, message: 'Admin ID is required!' };
    const { id } = parameters;
    const { email, bio, role, company, location, name } = requestBody;
    const admin = await Administrator.get({ id });
    if (!admin) {
      return response.status(400).json({ message: 'Admin Not Found!' });
      // return { message: 'Admin Not Found!' };
    }
    // Enforce role/company constraints for non-admin actors
    const actor = (request as any).user as any;
    const actorRole = String(actor?.role || '').toLowerCase();
    const actorCompanyId = String(actor?.companyId || '');

    let nextRole = role;
    let nextCompany = company;

    const isAdminActor = actorRole === 'administrator' || actorRole === 'admin';
    if (!isAdminActor) {
      if (actorRole === 'pivot') {
        // Pivot can only set client roles
        if (nextRole && !['client_super', 'client_user', 'client'].includes(String(nextRole).toLowerCase())) {
          return response.status(403).json({ message: 'Forbidden - Pivot may only assign client roles' });
        }
      } else if (actorRole === 'client_super') {
        // Client Super may only assign client_user and within own company
        if (nextRole && String(nextRole).toLowerCase() !== 'client_user') {
          return response.status(403).json({ message: 'Forbidden - Client Super may only assign Client Normal role' });
        }
        // Lock company to actor's company
        if (!actorCompanyId) {
          return response.status(400).json({ message: 'Missing actor company' });
        }
        nextCompany = actorCompanyId;
      } else {
        return response.status(403).json({ message: 'Forbidden - Insufficient access' });
      }
    }
    const updatedAdmin = await Administrator.update(
      { id },
      {
        email,
        name,
        location,
        companyId: nextCompany,
        role: nextRole,
        bio,
      },
    );
    updatedAdmin.password = '';
    return response.status(200).json({ admin: updatedAdmin });
    return { admin: updatedAdmin };
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
