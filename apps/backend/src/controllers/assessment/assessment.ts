/**
 * Assessment Handlers
 */
import { Assessment } from '../../models/';
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
      { index: 'gsIndex' }
    );
    const assessments = assessmentsResponse.items || [];
    if (!assessments) {
      return response.status(404).json({ message: 'Assessments Not Found' });
    }
    return response.status(200).json(assessments);
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getAssessment = async (request: Request, response: Response) => {
  try {
    const { employee } = request.body;
    const assessmentResponse = await Assessment.query(
      { _en: 'assessment' },
      { index: 'gsIndex', beginsWith: employee, limit: 1 }
    );
    const assessment =
      assessmentResponse.items.length > 0 ? assessmentResponse.items[0] : null;

    if (!assessment) {
      return response.status(400).json({ message: 'Assessment Not Found' });
    }
    return response.status(200).json({ assessment });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
