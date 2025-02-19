import { ActionPlan, Company, Department } from '../../models';
import { Request, Response } from 'express';


export const createActionPlan = async (request: Request, response: Response) => {
  try {
    const { name, companyId, departmentId, year, matrixType, tableData, dataPoints } = request.body;

    if (!name || !companyId || !departmentId || !year || !matrixType || !tableData || !dataPoints) {
      return response.status(400).json({ message: 'Missing required fields' });
    }

    const company = await Company.get({ id: companyId });
    if (!company) {
      return response.status(400).json({ message: 'Company not found' });
    }

    const department = await Department.get({ id: departmentId }); 
    if (!department) {
      return response.status(400).json({ message: 'Department not found' });
    }

    const actionPlan = await ActionPlan.create({
      name,
      companyName: company.name,  // Store company name
      companyId: company.id,  // Store company ID
      departmentName: department.name, // Store department name
      departmentId: department.id, // Store department ID
      year,
      matrixType,
      tableData,
      dataPoints,
      adminName: 'Admin', 
      adminId: 'Admin',
      deleted: false,
    });

    return response.status(200).json({
      message: 'Action plan has been successfully created',
      actionPlan: actionPlan 
    });

  } catch (error) {
    console.error("Error creating action plan:", error);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};