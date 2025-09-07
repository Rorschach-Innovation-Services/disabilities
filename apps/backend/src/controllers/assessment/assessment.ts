import { Assessment, Company, Department, Employee } from '../../models/';
import { Request, Response } from 'express';


import { getSpiderSeries } from '../../utilities/assessments';


/**
 * Retrieve all assessments
 * @param request object
 * @param response object
 * @returns response
 */
export const getAssessments = async (request: Request, response: Response) => {
  try {
    const assessmentsResponse = await Assessment.query(
      { _en: 'assessment' },
      { index: 'gsIndex' },
    );
    const assessments = assessmentsResponse.items || [];
    if (!assessments) {
      return response.status(400).json({ message: 'Assessments Not Found' });
       // return { message: 'Assessments Not Found' };
    }
    return response.status(200).json({ assessments });
    // return { assessments };
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};

export const getAssessment = async (request: Request, response: Response) => {
  try {
     // const requestBody = getRequestBody(event);
    const requestBody = request.body;
        // if (!requestBody)
    //   return { statusCode: 400, message: 'Request Body is required!' };
    const assessmentResponse = await Assessment.query(
      { _en: 'assessment' },
      { index: 'gsIndex', beginsWith: requestBody.employee, limit: 1 },
    );
    const assessment =
      assessmentResponse.items.length > 0 ? assessmentResponse.items[0] : null;

    if (!assessment) {
      return response.status(400).json({ message: 'Assessments Not Found' });
      // return { message: 'Assessment Not Found' };
    }
    return response.status(200).json({ assessment });
    // return { assessment };
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};

export const getDepartmentAssessments = async (
  request: Request,
  response: Response,
) => {
  try {
    // const parameters = getQueryStringParameters(event);
    const parameters = request.params;
    // if (!parameters?.departmentId)
    //   return { statusCode: 400, message: 'Department id is required!' };
    const { departmentId } = parameters;

    // Validate & load department to get companyId
    const department = await Department.get({ id: departmentId });
    if (!department) {
      return response.status(404).json({ message: 'Department Not Found' });
    }

    // Enforce client scoping: client roles must only access within their own company
    const user: any = (request as any).user || {};
    const role = String(user?.role || '').toLowerCase();
    const isClientUser = role === 'client_user' || role === 'client';
    const isClientSuper = role === 'client_super';
    if (isClientUser || isClientSuper) {
      const userCompanyId = String(user?.companyId || '');
      if (!userCompanyId || userCompanyId !== department.companyId) {
        return response
          .status(403)
          .json({ message: 'Forbidden - Department not within your company' });
      }
    }

    // Load all assessments for that department
    const assessmentRequest = await Assessment.query(
      { companyId: department.companyId },
      { beginsWith: departmentId, fetchAll: true },
    );

    let assessments =
      assessmentRequest.items.filter((item) => item._en === 'assessment') || [];

    // Optional per-employee filter (ephemeral use-case)
    // Accepts query ?employeeId=... and restricts results to that employee
    // Only allowed within the same company and department context
    const eidParam = String((request.query as any).employeeId || '').trim();
    if (eidParam) {
      const emp = await Employee.get({ id: eidParam });
      if (!emp) {
        return response.status(404).json({ message: 'Employee Not Found' });
      }
      // Enforce that the employee belongs to this department/company
      if (emp.companyId !== department.companyId || emp.departmentId !== department.id) {
        return response
          .status(403)
          .json({ message: 'Forbidden - Employee not within this department' });
      }
      assessments = assessments.filter((a) => a.employeeId === eidParam);
    } else if (isClientUser) {
      // If normal client user and no explicit employeeId provided,
      // restrict to only their own assessments (matched by employee email)
      const employeesRes = await Employee.query(
        { _en: 'employee' },
        { beginsWith: `${department.companyId}:${department.id}` },
      );
      const employees = (employeesRes.items || []).filter((e: any) => e._en === 'employee');
      const userEmail = String(user?.email || '').toLowerCase();
      const self = employees.find((e: any) => String(e.email || '').toLowerCase() === userEmail);
      if (!self) {
        assessments = [];
      } else {
        assessments = assessments.filter((a) => a.employeeId === self.id);
      }
    }

    // Remove (no matrix/radar) Build spider data 
    const spider = await getSpiderSeries(assessments, {
      questionnaireOrders: [3], 
      maxScore: 5,              
    });

    // Return a focused payload for the front-end spider chart
    return response.status(200).json({
      assessments,
      spiderChart: {
        axes: spider.axes, 
        dataPct: spider.pct,
        dataRaw: spider.raw, 
        sectorSummary: spider.sectorSummary, 
        subSummary: spider.subSummary,        
      },
    });
  } catch {
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
