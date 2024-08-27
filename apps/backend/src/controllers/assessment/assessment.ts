import {
  getCurrentAgainstImportance,
  getDoAbilityMatrix,
  getHighMatrix,
  getRadarChartValues,
} from '../../utilities/assessments';
import { Assessment, Company, Department } from '../../models/';
import {
  getRequestBody,
  APIGatewayEvent,
  getQueryStringParameters,
} from '../../utilities/api';
import { Request, Response } from 'express';

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
    const department = await Department.get({ id: departmentId });

    const assessmentRequest = await Assessment.query(
      { companyId: department.companyId },
      { beginsWith: departmentId, fetchAll: true },
    );

    const assessments =
      assessmentRequest.items.filter((item) => item._en === 'assessment') || [];
    const radarChart = await getRadarChartValues(assessments);
    const doAbilityMatrix = await getDoAbilityMatrix(assessments);
    const highMatrix = await getHighMatrix(assessments, 'high');
    const lowMatrix = await getHighMatrix(assessments, 'low');

    return response.status(200).json({
      assessments,
      radarChart,
      doAbilityMatrix,
      highMatrix,
      lowMatrix,
    });
    // return {
    //   assessments,
    //   radarChart,
    //   doAbilityMatrix,
    //   highMatrix,
    //   lowMatrix,
    // };
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { message: 'Internal Server Error' };
  }
};
