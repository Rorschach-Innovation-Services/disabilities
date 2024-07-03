import { Department } from '../../models';
import { getQueryStringParameters, APIGatewayEvent } from 'src/utilities/api';

export const getCompanyDepartments = async (event: APIGatewayEvent) => {
  try {
    const parameters = getQueryStringParameters(event);
    if (!parameters?.companyId)
      return { statusCode: 400, message: 'Company id is required!' };
    const { companyId } = parameters;
    const departmentsResponse = await Department.query(
      { companyId },
      { index: 'gsIndex', fetchAll: true }
    );
    const departments =
      departmentsResponse.items.filter((item) => item._en === 'department') ||
      [];
    return { departments };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
