import { Assessment, Employee } from '../../models';
import { Request, Response } from 'express';

export const getAverages = async (request: Request, response: Response) => {
  try {
    const employeesResponse = await Employee.query(
      { _en: 'employee' },
      { index: 'gsIndex' },
    );
    const employees = employeesResponse.items || [];
    const assessmentResponse = await Assessment.query(
      { _en: 'assessment' },
      { index: 'gsIndex' },
    );
    const assessments = assessmentResponse.items || [];
    if (!assessments) {
      return response.status(400).json({ message: 'Assessments Not Found' });
      // return { message: 'Assessments Not Found!' };
    }
    /**Number of Assessments */
    const completedAssessments = assessments.length;
    const numberOfAssessments = employees.length;
    /**Calculate the averages */
    let averageSleepHours: number = 0;
    console.log('assessments', assessments);
    // assessments.map((assessment) => {
    //   averageSleepHours += assessment.score.TSTValue;
    // });
    if (completedAssessments > 0)
      averageSleepHours = parseInt(
        (averageSleepHours / completedAssessments).toFixed(1),
      );
    return response.status(200).json({
      message: 'Successful!',
      data: {
        averageSleepHours,
        numberOfAssessments,
        completedAssessments,
        averageRating: 0,
      },
    });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
    // return { statusCode: 500, message: 'Internal Server Error' };
  }
};
