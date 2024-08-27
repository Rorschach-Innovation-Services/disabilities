import { generateGroupReport } from '../../utilities/group-report';
import { fetchPDFData } from '../../utilities/pdf-data';
import { Assessment, Company, Department } from '../../models';
import { getQueryStringParameters, APIGatewayEvent } from '../../utilities/api';
import { Request, Response } from 'express';
import { Readable } from 'stream';

/**
 * Retrieve all assessments
 * @param request object
 * @param response object
 * @returns response
 */
export const createGroupReport = async (
  request: Request,
  response: Response,
) => {
  try {
    // const parameters = getQueryStringParameters(event);
    // if (!parameters?.departmentId)
    //   return { statusCode: 400, message: 'Admin ID is required!' };
    const parameters = request.params;
    const { departmentId } = parameters;
    const department = await Department.get({ id: departmentId });

    if (!department)
      return response.status(400).json({ message: 'Department Not Found!' });
    // return { message: 'Department does not exist.' };

    const company = await Company.get({ id: department.companyId });
    if (!company)
      return response.status(400).json({ message: 'Company Not Found!' });
    // return { message: 'Company does not exist.' };

    const assessmentResponse = await Assessment.query(
      {
        companyId: company.id,
      },
      { beginsWith: `${department.id}` },
    );
    const assessments = assessmentResponse.items || [];
    (department as any).company = company;
    (department as any).assessments = assessments;

    const data = await fetchPDFData(department);
    const pdf = await generateGroupReport(data);
    response.contentType('application/pdf');
    response.attachment();

    const stream = Readable.from(pdf);
    stream.pipe(response);
    // return { contentType: 'application/pdf', pdf: pdf };
  } catch (error) {
    console.log('error', error);
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
