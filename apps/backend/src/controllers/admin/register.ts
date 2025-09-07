import { Administrator, Department } from '../../models';
import sendEmail from '../../utilities/sendEmail';
import { getRequestBody, APIGatewayEvent } from '../../utilities/api';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

export const register = async (request: Request, response: Response) => {
  try {
    // const requestBody = getRequestBody(event);
    // if (!requestBody)
    //   return { statusCode: 400, message: 'Request Body is required!' };
    // const { email, name } = requestBody;
    const {
      name,
      email,
      role: rawRole,
      company,
      password,
      department: deptFromBody,
      departmentId: deptIdFromBody,
    } = request.body as any;

    // Validate required fields
    if (!name || !email)
      return response
        .status(400)
        .json({ message: 'Name and Email are required' });

    // Normalise and validate role
    const allowedRoles = ['administrator', 'pivot', 'client_super', 'client_user'];
    const role = String(rawRole || '').toLowerCase();
    if (!role || !allowedRoles.includes(role))
      return response.status(400).json({ message: 'Invalid role' });

    // Enforce creator permissions
    const actor = (request as any).user as any;
    const actorRole = String(actor?.role || '').toLowerCase();
    const actorCompanyId = String(actor?.companyId || '');

    const isActorAdmin = actorRole === 'administrator' || actorRole === 'admin';
    if (!isActorAdmin) {
      if (actorRole === 'pivot') {
        // Pivot may only create client roles
        if (!(role === 'client_super' || role === 'client_user'))
          return response.status(403).json({ message: 'Forbidden - Pivot can only create client users' });
      } else if (actorRole === 'client_super') {
        // Client Super may only create client normal within own company
        if (role !== 'client_user')
          return response.status(403).json({ message: 'Forbidden - Client Super can only create Client Normal users' });
      } else {
        return response.status(403).json({ message: 'Forbidden - Insufficient access' });
      }
    }

    // If creating a client user, company is required
    const isClientRole = role === 'client_super' || role === 'client_user' || role === 'client';
    let companyId = isClientRole ? String(company || '') : '';
    // Client Super forced to own company and department
    if (!isActorAdmin && actorRole === 'client_super') {
      if (!actorCompanyId)
        return response.status(400).json({ message: 'Missing actor company' });
      if (companyId && companyId !== actorCompanyId)
        return response.status(403).json({ message: 'Forbidden - Must create users in own company' });
      companyId = actorCompanyId;
    }
    if (isClientRole && !companyId)
      return response.status(400).json({ message: 'Company is required for client roles' });

    // If client role, department is also required. Accept either department or departmentId
    let departmentId = isClientRole ? String(deptIdFromBody || deptFromBody || '') : '';
    if (isClientRole && !departmentId)
      return response.status(400).json({ message: 'Department is required for client roles' });

    // If client_super is creating, lock department to actor's own department
    if (!isActorAdmin && actorRole === 'client_super') {
      try {
        const actorRecord = await Administrator.get({ id: actor?.id });
        const actorDept = String(actorRecord?.departmentId || '');
        if (!actorDept)
          return response.status(400).json({ message: 'Missing actor department' });
        if (departmentId && departmentId !== actorDept)
          return response.status(403).json({ message: 'Forbidden - Must create users in own department' });
        departmentId = actorDept;
      } catch (_) {
        return response.status(400).json({ message: 'Missing actor department' });
      }
    }

    // Optionally validate department belongs to company
    if (departmentId) {
      try {
        const dept = await Department.get({ id: departmentId });
        if (!dept || dept.deleted)
          return response.status(400).json({ message: 'Invalid department' });
        if (companyId && dept.companyId !== companyId)
          return response.status(400).json({ message: 'Department does not belong to selected company' });
      } catch (_) {
        return response.status(400).json({ message: 'Invalid department' });
      }
    }

    // If password is provided, validate and hash
    let hashedPassword = '';
    if (password) {
      if (String(password).length < 8)
        return response.status(400).json({ message: 'Password must be at least 8 characters' });
      hashedPassword = await bcrypt.hash(String(password), 10);
    }

    const admin = await Administrator.create({
      email: email.toLowerCase(),
      name,
      password: hashedPassword,
      deleted: false,
      bio: '',
      role,
      photo: '',
      companyId,
      departmentId: departmentId || '',
      location: '',
      secondaryEmail: '',
    });

    // If no password provided, send create-password link email; else send welcome without link
    let emailData: any = undefined;
    try {
      const subject = 'Welcome To Sleep Science Platform';
      const message = !password
        ? `Thank you for registering to the platform. Please create your password by following the link:\nhttp://ec2-13-246-63-101.af-south-1.compute.amazonaws.com:9000/create-password/${admin?.id}`
        : `Your account has been created. You can now sign in using your email address.`;
      emailData = await sendEmail(email.toLowerCase(), name, subject, message);
    } catch (_) {
      // Do not fail registration if email fails
    }
    return response.status(200).json({ message: 'Registration Successful', data: emailData });
    // return { message: 'Registration Successful', data: emailPromise };
  } catch (error) {
    return response.status(500).send({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
