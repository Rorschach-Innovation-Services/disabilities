import { Assessment, Company, Department } from '../../models/';
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

    // Load all assessments for that department
    const assessmentRequest = await Assessment.query(
      { companyId: department.companyId },
      { beginsWith: departmentId, fetchAll: true },
    );

    const assessments =
      assessmentRequest.items.filter((item) => item._en === 'assessment') || [];

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
