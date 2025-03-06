import { ActionPlan, Company, Department } from '../../models';
import { Request, Response } from 'express';

export const getActionPlans = async (request: Request, response: Response) => {
  try {
    // const requestBody = getRequestBody(event);
    // if (!requestBody)
    //   return { statusCode: 400, message: 'Request Body is required!' };
    // const { email, name } = requestBody;
    const { companyId, departmentId } = request.body;
    const company = await Company.get({ id: companyId });
    if(!company) return response.status(400).send({ message: 'Company not found' });
    const department = await Department.get({ id: departmentId });
    if(!department) return response.status(400).send({ message: 'Department not found' });
    
    const actionPlans = await ActionPlan.query({departmentId,companyId},{fetchAll:true});
    
    return response.status(200).json({
      message: 'Action plans have been retrieved',
      plans: actionPlans.items
        .filter(item => !item.deleted)
        .map(plan => ({
          id: plan.id,
          name: plan.name,
          companyId: plan.companyId ?? 'MISSING',  
          departmentId: plan.departmentId ?? 'MISSING',  
          year: plan.year,
          matrixType: plan.matrixType,
          tableData: plan.tableData,
          dataPoints: plan.dataPoints,
          adminName: plan.adminName,
          adminId: plan.adminId,
        })),
    });
    
  } catch (error) {
      console.error(error);
    return response.status(500).send({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
