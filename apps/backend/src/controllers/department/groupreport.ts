import { generateGroupReport } from '../../utilities/group-report';
import { fetchPDFData } from '../../utilities/pdf-data';
import { Assessment, Company, Department } from '../../models';

/**
 * Retrieve all assessments
 * @param request object
 * @param response object
 * @returns response
 */
export const createGroupReport = async (departmentId: string) => {
  try {
    const department = await Department.get({ id: departmentId });

    if (!department) return { message: 'Department does not exist.' };

    const company = await Company.get({ id: department.companyId });
    if (!company) return { message: 'Company does not exist.' };

    const assessmentResponse = await Assessment.query(
      {
        companyId: company.id,
      },
      { beginsWith: `${department.id}` }
    );
    const assessments = assessmentResponse.items || [];
    (department as any).company = company;
    (department as any).assessments = assessments;

    const data = await fetchPDFData(department);
    const pdf = await generateGroupReport(data);

    return { contentType: 'application/pdf', pdf: pdf };
  } catch (error) {
    console.log('error', error);
    return { message: 'Internal Server Error' };
  }
};
