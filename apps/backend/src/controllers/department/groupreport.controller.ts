import { Request, Response } from 'express';
import { generateGroupReport } from '../../utilities/group-report';
import { Readable } from 'stream';
import { fetchPDFData } from '../../utilities/pdf-data';
import { Assessment, Company, Department } from '../../models';

/**
 * Retrieve all assessments
 * @param request object
 * @param response object
 * @returns response
 */
export const createGroupReport = async (
  request: Request,
  response: Response
) => {
  try {
    const { departmentId } = request.params;
    const departmentResponse = await Department.get({ id: departmentId });
    const department = departmentResponse.Item;

    if (!department)
      return response
        .status(400)
        .json({ message: 'Department does not exist.' });

    const companyResponse = await Company.get({ id: department.id });
    const company = companyResponse.Item;
    if (!company)
      return response.status(400).json({ message: 'Company does not exist.' });

    const assessmentResponse = await Assessment.query(
      {
        companyId: company.id,
      },
      { beginsWith: `${department.id}` }
    );
    const assessments = assessmentResponse.Items || [];
    (department as any).company = company;
    (department as any).assessments = assessments;

    const data = await fetchPDFData(department);
    const pdf = await generateGroupReport(data);

    response.contentType('application/pdf');
    response.attachment();

    const stream = Readable.from(pdf);
    stream.pipe(response);
  } catch (error) {
    console.log('error', error);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
