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
    const role = String(rawRole || 'administrator').toLowerCase();
    if (!allowedRoles.includes(role))
      return response.status(400).json({ message: 'Invalid role' });

    // If creating a client user, company is required
    const isClientRole = role === 'client_super' || role === 'client_user' || role === 'client';
    const companyId = isClientRole ? String(company || '') : '';
    if (isClientRole && !companyId)
      return response.status(400).json({ message: 'Company is required for client roles' });

    // If client role, department is also required. Accept either department or departmentId
    const departmentId = isClientRole ? String(deptIdFromBody || deptFromBody || '') : '';
    if (isClientRole && !departmentId)
      return response.status(400).json({ message: 'Department is required for client roles' });

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
