import { ActionPlan, Company, Department } from '../../models';
import { Request, Response } from 'express';

export const createActionPlan = async (request: Request, response: Response) => {
  try {
    // const requestBody = getRequestBody(event);
    // if (!requestBody)
    //   return { statusCode: 400, message: 'Request Body is required!' };
    // const { email, name } = requestBody;
    const { name, companyId, departmentId,year, matrixType,tableData, dataPoints } = request.body;
    const company = await Company.get({ id: companyId });
    if(!company) return response.status(400).send({ message: 'Company not found' });
    const department = await Department.get({ id: departmentId });
    if(!department) return response.status(400).send({ message: 'Department not found' });
    
    const actionPlan = await ActionPlan.create({
      name,
      companyName: company.name,
      companyId,
      departmentName: department.name,
      departmentId,
      year,
      matrixType,
      tableData,
      dataPoints,
      adminName: 'Admin',
      adminId: 'Admin',
      deleted: false,
      });    
   return response
      .status(200)
      .json({ message: 'Action plan has been successfully created',});
  } catch (error) {
      console.error(error);
    return response.status(500).send({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
