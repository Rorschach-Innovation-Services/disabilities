import { Department } from '../../models';
import { getQueryStringParameters, APIGatewayEvent } from '../../utilities/api';
import { Request, Response } from 'express';

export const getCompanyDepartments = async (
  request: Request,
  response: Response,
) => {
  try {
    // const parameters = getQueryStringParameters(event);
    // if (!parameters?.companyId)
    //   return { statusCode: 400, message: 'Company id is required!' };
    const parameters = request.params;
    const { companyId } = parameters;
    const departmentsResponse = await Department.query(
      { companyId },
      { index: 'gsIndex', fetchAll: true },
    );
    const departments =
      departmentsResponse.items.filter((item) => item._en === 'department') ||
      [];
    return response.status(200).json({ departments });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
