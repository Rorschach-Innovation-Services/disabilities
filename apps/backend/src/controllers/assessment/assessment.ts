import {
  getCurrentAgainstImportance,
  getDoAbilityMatrix,
  getHighMatrix,
  getRadarChartValues,
} from 'src/utilities/assessments';
import { Assessment, Company, Department } from '../../models/';
import {
  getRequestBody,
  APIGatewayEvent,
  getQueryStringParameters,
} from 'src/utilities/api';

/**
 * Retrieve all assessments
 * @param request object
 * @param response object
 * @returns response
 */
export const getAssessments = async () => {
  try {
    const assessmentsResponse = await Assessment.query(
      { _en: 'assessment' },
      { index: 'gsIndex' }
    );
    const assessments = assessmentsResponse.items || [];
    if (!assessments) {
      return { message: 'Assessments Not Found' };
    }
    return { assessments };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};

export const getAssessment = async (event: APIGatewayEvent) => {
  try {
    const requestBody = getRequestBody(event);
    if (!requestBody)
      return { statusCode: 400, message: 'Request Body is required!' };
    const assessmentResponse = await Assessment.query(
      { _en: 'assessment' },
      { index: 'gsIndex', beginsWith: requestBody.employee, limit: 1 }
    );
    const assessment =
      assessmentResponse.items.length > 0 ? assessmentResponse.items[0] : null;

    if (!assessment) {
      return { message: 'Assessment Not Found' };
    }
    return { assessment };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};

export const getDepartmentAssessments = async (event: APIGatewayEvent) => {
  try {
    const parameters = getQueryStringParameters(event);
    if (!parameters?.departmentId)
      return { statusCode: 400, message: 'Department id is required!' };
    const { departmentId } = parameters;
    const department = await Department.get({ id: departmentId });

    const assessmentRequest = await Assessment.query(
      { companyId: department.companyId },
      { beginsWith: departmentId, fetchAll: true }
    );

    const assessments =
      assessmentRequest.items.filter((item) => item._en === 'assessment') || [];
    const radarChart = await getRadarChartValues(assessments);
    const doAbilityMatrix = await getDoAbilityMatrix(assessments);
    const highMatrix = await getHighMatrix(assessments, 'high');
    const lowMatrix = await getHighMatrix(assessments, 'low');

    return {
      assessments,
      radarChart,
      doAbilityMatrix,
      highMatrix,
      lowMatrix,
    };
  } catch (error) {
    return { message: 'Internal Server Error' };
  }
};
