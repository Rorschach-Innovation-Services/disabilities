import { Assessment } from '../../models/';
import { getRequestBody, APIGatewayEvent } from 'src/utilities/api';

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
